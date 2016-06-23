var expect = require('chai').expect; // Using "expect" style of Chai.
var CourseDirectory = require('./../src/course-directory');

describe('CourseDirectory', function() {
    
    describe('Constructor', function() {
        
        describe('Fail path', function(){
            it('Should fail to create a new CourseDirectory without an inputArray', function() {
                expect (function(){ new CourseDirectory(); }).to.throw( TypeError );
            });
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
    
    describe('Directory Utility Functions', function() {
        var directory = new CourseDirectory([]);
        
        describe('Fail path', function(){
            
            it('Should fail to add empty item to CourseDirectory.courseHash', function() {
                expect(function() { directory.addItem() }).to.throw(TypeError);
            });
            
            it('Should fail if CourseDirectory.hasPrerequisite() parameter is not an array', function() {
                expect(function() { directory.hasPrerequisite() }).to.throw(TypeError);
            });
        });
        
        describe('Pass path', function(){
            
            it('Should add items to CourseDirectory.courseHash', function() {
                expect(function() { directory.addItem('Introduction to Fire', ['Advanced Pyrotechnics']) }).to.not.throw(Error);
            });
            
            it('Should not have a prerequisite', function() {
                var inputArray = ['Introduction to Fire', ''];
                
                expect(directory.hasPrerequisite(inputArray)).to.be.false;
            });
            
            it('Should have a prerequisite', function() {
                var inputArray = ['Advanced Pyrotechnics', 'Introduction to Fire'];
                
                expect(directory.hasPrerequisite(inputArray)).to.be.true;
            });
            
            it('Should return the Course from an \'Course: Prerequisite\' item', function(){
                var inputArray = ['Introduction to Fire', ''];
                
                expect(directory.getCourse(inputArray)).to.be.equal('Introduction to Fire');
            });
            
            it('Should return the Course from an \'Course: \'  item', function(){
                var inputArray = ['Advanced Pyrotechnics', 'Introduction to Fire'];
                
                expect(directory.getCourse(inputArray)).to.be.equal('Advanced Pyrotechnics');
            });
            
            it('Should return the Prerequisite from an \'Course: Prerequisite\'  item', function(){
                var inputArray = ['Advanced Pyrotechnics', 'Introduction to Fire'];
                
                expect(directory.getPrerequisite(inputArray)).to.be.equal('Introduction to Fire');
            });
            
        });
    });
    
    describe('Directory Parsing Functions', function() {
        
        describe('Fail path', function(){
            
        });
        
        describe('Pass path', function(){
            
            it('Should read the courseArray and parse the Prerequisite into CourseDirectory.courseHash', function() {
                var inputArray = ['Introduction to Fire: '];
                var directory = new CourseDirectory(inputArray);
                
                var hash = new Object();
                hash['Introduction to Fire'] = [];

                
                expect(function() {
                    directory.createCourseHash();
                    //console.log('test ' + directory.courseHash['Introduction to Fire'].pop());
                }).to.not.throw(Error);
            });
            
        });
    });
});
