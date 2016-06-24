var inputFile = require('./../src/input-file');
var CourseDirectory = require('./../src/course-directory');

function printCourseList(err, array) {
    if(err) {
        console.error(err);
    }
    else {
        var courseDirectory = new CourseDirectory(array);
        courseDirectory.createCourseHash();
        courseDirectory.printOrderedCourses();
    }
}

inputFile.readInputFile(process.argv[2], printCourseList);
