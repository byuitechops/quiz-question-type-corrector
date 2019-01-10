const main = require('./main.js');
const inquirer = require('inquirer');
const d3 = require('d3-dsv');
const fs = require('fs');

const questions = [{
    type: 'list',
    name: 'csvormanual',
    message: 'CSV or Manual?',
    choices: ['CSV', 'Manual']
}, {
    type: 'input',
    name: 'filepath',
    message: 'Please enter the CSV filepath:',
    validate: answer => /.csv$/.test(answer),
    when: answers => answers.csvormanual === 'CSV'
},
{
    type: 'input',
    name: 'courseID',
    message: 'Please enter the course ID:',
    validate: answer => /^[0-9]+$/.test(answer),
    when: answers => answers.csvormanual === 'Manual'
}
];

function parseCSV(path) {
    var csvData = fs.readFileSync(path, 'utf8');
    let parsedCSV = d3.csvParse(csvData);

    return parsedCSV.map(courseID => courseID['Course ID']);
}

function getInput(callback) {
    var inputObj;
    return inquirer.prompt(questions)
        .then(answers => {
            if (answers.csvormanual === 'CSV') {
                // Parse CSV and create Object
                var courseIDs = parseCSV(answers.filepath);
                inputObj = courseIDs;
            } else {
                // Create object
                inputObj = [answers.courseID];
            }
            callback(inputObj, getOutput);
        }, console.error);
}

function getOutput(err, output) {
    // How to output data, eg. to csv, to json, to console, etc.
    return;
}

(function () {
    getInput(main);
})();