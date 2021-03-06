/*jslint node: true */
'use strict';
var fs = require('fs');
    
function splitFile(callback, err, fileData) {
    if (err) {
        callback(err);
    }
    else {
        var results = fileData.split('\n');
        callback(null, results);
    }
}

exports.readInputFile = function(path, callback) {
    try {
        fs.readFile(path, 'utf8', splitFile.bind(null, callback));
    } catch(err) {
        callback(err);
    }
}
