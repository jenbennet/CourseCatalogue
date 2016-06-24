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
            
            it('Should fail if CourseDirectory.invalidItem() parameter is a string or undefined', 
               function() {
                expect(function() { directory.invalidItem() }).to.fail;
            });
            
            it('Should fail if CourseDirectory.validPrequisite() parameter is not a string', 
               function() {
                expect(function() { directory.validPrequisite() }).to.throw(TypeError);
            });
            
            it('Should fail if CourseDirectory.getCourse() parameter is not an array', 
               function() {
                expect(function() { directory.getCourse() }).to.throw(TypeError);
            });
            
            it('Should fail if CourseDirectory.getPrerequisite() parameter is not an array', 
               function() {
                expect(function() { directory.getPrerequisite() }).to.throw(TypeError);
            });
            
            it('Should fail CourseDirectory.stringify() parameter is not an array', 
               function() {
                expect(function() { directory.stringify(5) }).to.throw(TypeError);
            });
        });
        
        describe('Pass path', function(){
            
            it('Should not be a valid item', function() {
                expect(directory.invalidItem('')).to.be.true;
            });
            
            it('Should not be a valid item', function() {
                expect(directory.invalidItem(undefined)).to.be.true;
            });
            
            it('Should not be a valid item', function() {
                expect(directory.invalidItem('Introduction to Fire')).to.be.false;
            });
            
            it('Should not be valid prerequisite', function() {
                expect(directory.validPrequisite('')).to.be.false;
            });
            
            it('Should be a valid prerequisite', function() {
                expect(directory.validPrequisite('Introduction to Fire')).to.be.true;
            });
            
            it('Should return the Course from an \'Course: Prerequisite\' item', 
               function(){
                var inputArray = ['Introduction to Fire', ''];
                
                expect(directory.getCourse(inputArray)).to.be.equal('Introduction to Fire');
            });
            
            it('Should return the Course from an \'Course: \'  item', 
               function(){
                var inputArray = ['Advanced Pyrotechnics', 'Introduction to Fire'];
                
                expect(directory.getCourse(inputArray)).to.be.equal('Advanced Pyrotechnics');
            });
            
            it('Should return the Prerequisite from an \'Course: Prerequisite\'  item', 
               function(){
                var inputArray = ['Advanced Pyrotechnics', 'Introduction to Fire'];
                expect(directory.getPrerequisite(inputArray)).to.be.equal('Introduction to Fire');
            });
            
            it('Should return an empty string from an empty array', 
               function(){
                expect(directory.stringify([])).to.be.equal('');
            });
            
            it('Should return the comma separated string from an array', 
               function(){
                var inputArray = ['Introduction to Fire', 'Advanced Pyrotechnics'];
                
                expect(directory.stringify(inputArray)).to.be.equal('Introduction to Fire, Advanced Pyrotechnics');
            });
            
        });
    });
    
    describe('Directory Parsing Functions', function() {
        
        describe('Fail path', function(){
            it('Should not add empty lines to CourseDirectory.courseHash', 
               function() {
                var inputArray = [''];
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.be.empty;
            });
            
            it('Should not process undefined lines', 
               function() {
                var inputArray = [,];
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.be.empty;
            });
        });
        
        describe('Pass path', function(){
            
            it('Should read the courseArray and parse the Prerequisite into CourseDirectory.courseHash', function() {
                var inputArray = ['Introduction to Fire: '];
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.have.property('Introduction to Fire').that.is.an('array').that.is.empty;
            });

            it('Should read the courseArray and parse the Prerequisite and Course into CourseDirectory.courseHash', function() {
                var inputArray = ['Advanced Pyrotechnics: Introduction to Fire'];
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.have.property('Introduction to Fire').that.is.an('array').with.deep.property('[0]').that.equals('Advanced Pyrotechnics');
            });
            
            it('Should parse the data correctly independently of the order of the array CourseDirectory.courseHash', function() {
                var inputArray = ['History of Cubicle Siege Engines: Rubber Band Catapults 101', 'Advanced Office Warfare: History of Cubicle Siege Engines', 'Rubber Band Catapults 101: ']
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.have.property('Rubber Band Catapults 101').that.is.an('array').that.has.length(2);
            });
            
            it('Should parse the data correctly independently of the order of the array CourseDirectory.courseHash', function() {
                var inputArray = ['Advanced Office Warfare: History of Cubicle Siege Engines', 'History of Cubicle Siege Engines: Rubber Band Catapults 101', 'Rubber Band Catapults 101: ']
                var directory = new CourseDirectory(inputArray);
                
                directory.createCourseHash();
                expect(directory.courseHash).to.have.property('Rubber Band Catapults 101').that.is.an('array').that.has.length(2);
            });
        });
    });
});
