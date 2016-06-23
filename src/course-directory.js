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

CourseDirectory.prototype.hasPrerequisite = function(item) {
    if ( Array.isArray(item) ) {
        return item[1] !== '';
    } 
    else {
        throw new TypeError('Parameter must be an array');
    }
};

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

CourseDirectory.prototype.createCourseHash = function() {    
    for (let item of this.courseArray) {
        
        if (item === '') {
            continue;
        }
        
        var splitItem = item.split(': ');
        
        //if this is a Course: Prerequisite 
        if ( this.hasPrerequisite(splitItem) ) {
            var prerequisite = this.getPrerequisite(splitItem);
            var course = this.getCourse(splitItem);
            
            if ( prerequisite in this.courseHash ) {
                this.courseHash[prerequisite].push(course);
            }
            else {
                this.courseHash[prerequisite] = [course];
            }
        }
        //if this is a Course: 
        else {
            this.courseHash[this.getCourse(splitItem)] = [];
        }
    }
}

// export the class
module.exports = CourseDirectory;
