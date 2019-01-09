/*************************************************************************
 * Module Description
 *************************************************************************/
function main(data, callback) {
    supportingFunction1();
    supportingFunction2();
    supportingFunction3();
    return callback(null, data);
}

function supportingFunction1() {}

function supportingFunction2() {}

function supportingFunction3() {}


module.exports = main;