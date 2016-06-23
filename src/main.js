var inputFile = require('./../src/input-file');
var CourseDirectory = require('./../src/course-directory');

function printCourseList(err, array) {
    if(err) {
        console.error(err);
    }
    else {
        console.log('--- inputArray ---');
        console.log(array);
        
        var courseDirectory = new CourseDirectory(array);
        courseDirectory.createCourseHash();
        
        console.log('\n--- courseHash ---');
        console.log(courseDirectory.courseHash);
    }
}

inputFile.readInputFile(process.argv[2], printCourseList);
