/*************************************************************************
 * Module Description
 *************************************************************************/
const asyncLib = require('async');
const canvas = require('canvas-api-wrapper');
const tasks = require('./tasks/tasks.js');

const badQuestionTypes = ['multiple_choice_question', 'matching_question', ''];

function getQuizQuestions(quizObj, callback) {
    canvas.getQuizQuestions(quizObj.courseID, quizObj.id, (err, questions) => {
        if (err) {
            callback(err, null);
            return;
        }
        // Filter the questions to just the ones we need to fix
        let filteredQuestions = questions.filter(question => {
            return badQuestionTypes.includes(question.question_type);
        });
        callback(null, filteredQuestions);
    });
}

function getQuizzes(courseID, callback) {
    canvas.getQuizzes(courseID, (err, quizzes) => {
        if (err) {
            callback(err, null);
            return;
        }
        quizzes = quizzes.map(quiz => {
            return {
                id: quiz.id,
                courseID
            };
        });
        asyncLib.mapLimit(quizzes, 10, getQuizQuestions, (err, data) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, data);
        });
    });
}

function main(courseIDs, callback) {
    asyncLib.mapLimit(courseIDs, 10, getQuizzes, (err, quizQuestions) => {
        quizQuestions = quizQuestions[0];
        if (err) {
            callback(err, null);
            return;
        }
        let totalQuestionLength = quizQuestions.reduce((acc, curr) => {
            acc += curr.length;
            return acc;
        }, 0);
        if (totalQuestionLength > 0) {
            console.log('Quiz questions successfully retrieved');
            // Start running checks and fixes on bad question types
            asyncLib.waterfall(tasks, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } else {
            callback(null, 'Questions with bad question types were not found');
        }

    });
}

module.exports = main;