/*jslint node: true */
'use strict';

// Constructor
function CourseDirectory(courseArray) {
    if ( Array.isArray(courseArray) ) {
        this.courseArray = courseArray;
        this.courseHash = new Object(); 
    } else {
        throw new TypeError('Input parameter must be an Array');
    }
}

//class methods

CourseDirectory.prototype.getCourse = function(item) {
    if ( Array.isArray(item) ) {
        return item.shift();
    } 
    else {
        throw new TypeError('Parameter must be an array');
    }
};

CourseDirectory.prototype.getPrerequisite = function(item) {
    if ( Array.isArray(item) ) {
        return item.pop();
    } 
    else {
        throw new TypeError('Parameter must be an array');
    }
};

CourseDirectory.prototype.invalidItem = function(item) {
    return item === '' || typeof item === 'undefined';
};

CourseDirectory.prototype.validPrequisite = function(item) {
    if (typeof item === 'string') {
        return item !== '';
    }
    else {
        throw new TypeError('Parameter must be a string');
    }
};

CourseDirectory.prototype.addPrequisite = function(course) {
    //only add the prerequisite if it doesn't already exist in the table
    if ( ! (course in this.courseHash) ) {
        this.courseHash[course] = [];
    } 
};

CourseDirectory.prototype.addCourse = function(prerequisite, course, array) {
    //the prerequisite exists in the hash
    if ( prerequisite in this.courseHash ) {
        this.courseHash[prerequisite].push(course);
    }

    //the curse exists as prerequist and needs to be moved to a new prerequisite as a course
    else if ( course in this.courseHash ){
        this.courseHash[prerequisite] = this.courseHash[course];
        this.courseHash[prerequisite].push(course);    
        delete(this.courseHash[course]);
    }

    //the course already exists as a course in the hash
    else if ( array.indexOf(prerequisite) >= 0) {
        for ( let key of Object.keys(this.courseHash) ) {
            if ( this.courseHash[key].indexOf(prerequisite) >= 0 ) {
                this.courseHash[key].push(course);
                break;
            }
        }
    }

    //the prerequisite and the course don't exist in the hash table
    else {
        this.courseHash[prerequisite] = [course];
    }
};

CourseDirectory.prototype.createCourseHash = function() { 
    var tempArray = [];
    
    for ( let item of this.courseArray ) {
        
        if ( this.invalidItem(item) ) {
            continue;
        }
        
        var splitItem = item.split(': ');
        var prerequisite = this.getPrerequisite(splitItem);
        var course = this.getCourse(splitItem);
        
        //this is a Course: Prerequisite 
        if ( this.validPrequisite(prerequisite) ) {
            tempArray.push(course);
            this.addCourse(prerequisite, course, tempArray);
        }
        
        //this is a Course:
        else {
            this.addPrequisite(course);
        }
    }
};

CourseDirectory.prototype.stringify = function(array) {
    return array.join(', ');
};

CourseDirectory.prototype.printOrderedCourses = function() {
    var output = '';
    var keys = Object.keys(this.courseHash);
    output += this.stringify(keys); 
    
    for (let key of keys) {
        output += ', ' + this.stringify(this.courseHash[key]);
    }
    
    console.log(output);
};

// export the class
module.exports = CourseDirectory;
