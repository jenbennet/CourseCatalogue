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
    var tempArray = [];
    
    for ( let item of this.courseArray ) {
        
        if ( item === '' ) {
            continue;
        }
        
        var splitItem = item.split(': ');
        
        var prerequisite = this.getPrerequisite(splitItem);
        var course = this.getCourse(splitItem);
        
        //this is a Course: Prerequisite 
        if ( prerequisite !== '' ) {
            
            //the prerequisite exists in the hash
            if ( prerequisite in this.courseHash ) {
                this.courseHash[prerequisite].push(course);
                tempArray.push(course);
            }
            
            //the curse exists as prerequist and needs to be moved to a new prerequisite as a course
            else if ( course in this.courseHash ){
                this.courseHash[prerequisite] = [course];
                this.courseHash[prerequisite] = this.courseHash[prerequisite].concat(this.courseHash[course]);
                delete(this.courseHash[course]);
                tempArray.push(course);
            }
            
            //the course already exists as a course in the hash
            else if ( tempArray.indexOf(prerequisite) >= 0) {
                
                for ( let key of Object.keys(this.courseHash) ) {
                    
                    if ( this.courseHash[key].indexOf(prerequisite) >= 0 ) {
                        this.courseHash[key].push(course);
                        tempArray.push(course);
                        continue;
                    }
                }
            }
            
            //the prerequisite and the course don't exist in the hash table
            else {
                this.courseHash[prerequisite] = [course];
                tempArray.push(course);
            }
        }
        
        //this is a Course:
        else {
            //the prerequisite already exists in the table, do not override
            if ( course in this.courseHash ) {
                continue;
            }
        
             
            else {
                this.courseHash[course] = [];
            }
        }
    }
};

CourseDirectory.prototype.printOrderedCourses = function() {
    var output = '';
    var keys = Object.keys(this.courseHash);
    output = keys.join(', ');
    
    for (let key of keys) {
        if ( this.courseHash[key].length > 0 ) {
            output = output + ', ' + this.courseHash[key].join(', ');
        }
    }
    
    console.log(output);
};

// export the class
module.exports = CourseDirectory;
