var expect = require('chai').expect; // Using "expect" style of Chai.
var CourseDirectory = require('./../src/course-directory');

describe('CourseDirectory', function() {
    
    describe('Constructor', function() {
        
        describe('Fail path', function(){
            
        });
        
        describe('Pass path', function(){
            var inputArray = [];
            var directory = new CourseDirectory(inputArray);
            
            it('Should create a new CourseDirectory object', function() {
                expect(directory).to.not.be.undefined;
            });
            
            it('Should be possible to access CourseDirectory.courseArray', function() {
                expect(directory.courseArray).to.be.equal(inputArray);    
            });
            
            it('Should be possible to access CourseDirectory.courseHash', function() {
                expect(directory.courseHash).not.to.be.undefined;    
            });
        });
    });
});
