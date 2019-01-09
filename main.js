/*************************************************************************
 * Module Description
 *************************************************************************/
function main(data, callback) {
    console.log(data);
    return callback(null, data);
}

module.exports = main;