/*************************************************************************
 * Module Description
 *************************************************************************/
const asyncLib = require('async');
const canvas = require('canvas-api-wrapper');

function getQuizQuestions(quizObj, callback) {
    canvas.getQuizQuestions(quizObj.courseID, quizObj.id, (err, questions) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, questions);
    });
}

function getQuizzes(courseID, callback) {
    canvas.getQuizzes(courseID, (err, quizzes) => {
        if (err) {
            console.error(err);
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
    asyncLib.mapLimit(courseIDs, 10, getQuizzes, (err, data) => {
        data = data[0][24];
        if (err) {
            console.error(err);
            callback(err, null);
            return;
        }
        console.dir(data, {
            depth: null
        });
        console.log(data.length);
        callback(null, data);
    });
}

module.exports = main;