const checks = require('./checks/checks.js');
const fixes = require('./fixes/fixes.js');

module.exports = [
    checks.compare,
    fixes.fixMultiSelect
];