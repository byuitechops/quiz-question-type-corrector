const assert = require('assert');
const {
    main
} = require('./main.js');

/*************************************************************************
 * Test Description
 * Pass in 0, get out 0
 *************************************************************************/
try {
    assert.strictEqual(main(0), 0, 'Test 1 Failed'); // Expected Output: TRUE
} catch (err) {
    defaultErrorLog(err)
}

/*************************************************************************
 * Test Desciption
 * Pass in 1, get out 1
 *************************************************************************/
try {
    assert.strictEqual(main(1), 1, 'Test 2 Failed'); // Expected Output: FALSE
} catch (err) {
    defaultErrorLog(err)
}

/*************************************************************************
 * Test Description
 * Pass in number, get out number
 *************************************************************************/
try {
    assert.strictEqual(typeof main(0), typeof 5, 'Test 3 Failed'); // Expected Output: TRUE
} catch (err) {
    defaultErrorLog(err)
}

function defaultErrorLog(err) {
    console.log(`${err.message}: ${err.code}, ${err.actual} ${err.operator} ${err.expected}.`);
};