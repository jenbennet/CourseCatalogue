/*jslint node: true */
'use strict';

// Constructor
function CourseDirectory(courseArray) {
  if ( Array.isArray(courseArray) ) {
      this.courseArray = courseArray;
      this.courseHash = new Object(); // default value
  } else {
      throw new TypeError('Input parameter must be an Array');
  }
}

// export the class
module.exports = CourseDirectory;
