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

CourseDirectory.prototype.addItem = function(prerequisite, courseArray) {
    if ( (typeof(prerequisite) === 'string') && Array.isArray(courseArray) ) {
        this.courseHash[prerequisite] = courseArray;
        //console.log(this.courseHash);
    } else {
        throw new TypeError('Prerequisite must be a string and courseArray an Array');
    }
};

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
        var splitItem = item.split(': ');
//        console.log('\ncourselala');
//        console.log(item);
//        console.log(splitItem);
        
        if ( this.hasPrerequisite(splitItem) ) {
            console.log('lala');
//            var prerequisite = this.getPrerequisite(splitItem);
//            var course = this.getCourse(splitItem);
//            
//            for (var key in this.courseHash) {
//                if ( this.courseHash.hasOwnProperty(key) ) {
//                    this.courseHash[key].push(course);
//                    break;
//                }
//                else {
//                    this.courseHash[prerequisite] = [course];
//                }
//            }
        }
        else {
            //console.log('lolo');
            this.courseHash[this.getCourse(splitItem)] = [];
            //this.addItem(splitItem);
        }
    }
}

// export the class
module.exports = CourseDirectory;
