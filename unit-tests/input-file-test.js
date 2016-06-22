//var chai = require('chai');
var path = require('path');

var expect = require('chai').expect; // Using "expect" style of Chai.
var assert = require('chai').assert; // Using "assert" style of Chai.
var inputFile = require('./../src/input-file.js');

describe('InputFile', function() {
    
    describe('ReadInputFile', function() {
        
        describe('Fail path', function(){
            it('InputFile.readInputFile should not accept null paths', function(done) {
                inputFile.readInputFile(null, function(err){
                    done();
                    expect(err).to.not.be.TypeError;
                });
            });
            
            it('InputFile.readInputFile should not accept arrays as paths', function(done) {
                inputFile.readInputFile([], function(err){
                    done();
                    expect(err).to.not.be.TypeError;
                });
            });

            it('InputFile() should return an undefined object', function(done) {
                inputFile.readInputFile('', function(err, results){
                    done();
                    expect(results).to.be.undefined;
                });
            });
        });
        
        describe('Pass path', function(){
            var file = path.resolve(path.parse(__dirname).dir + '/unit-tests/input-file.txt');
            
            it('InputFile(path) should return an array', function(done) {
                inputFile.readInputFile(file, function(err, results){
                    done();
                    expect(Array.isArray(results)).to.be.true;
                });
            });
        });
    });
});
