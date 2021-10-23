const fs = require("fs");
const users = require("./generate-users");

// https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_filehandle_writefile_data_options
const jsonUsers = JSON.stringify(users);
const fd = fs.openSync('users-callbacks-1.json', 'w+');
const fd2 = fs.openSync('users-callbacks-2.json', 'w+');
const fd3 = fs.openSync('users-callbacks-3.json', 'w+');


// Save files in parallel

// console.log("Writing to file users.json")
//
// fs.writeFile(fd, jsonUsers,  (err) => {
//     if (err) throw err;
//     console.log('The file users-callbacks.json has been saved!');
// });
//
// console.log("Writing to file users-copy-json");
//
// fs.writeFile(fd2, jsonUsers,  (err) => {
//     if (err) throw err;
//     console.log('The file users-callbacks-copy.json has been saved!');
// });
//
// console.timeEnd("WRITING_TO_FILES");
// console.log("I got to the end before saving files");

// Save files in order but with callbacks
console.time("WRITING_TO_FILE1");
console.log("Starting to save file 1");

// Save files one after the other

fs.writeFile(fd, jsonUsers,  (err) => {
    if (err) throw err;
    console.log('The file users-callbacks-1.json has been saved!');
    console.timeEnd("WRITING_TO_FILE1");

    console.log("Starting to save file 2");
    console.time("WRITING_TO_FILE2");
    fs.writeFile(fd2, jsonUsers,  (err) => {
        if (err) throw err;
        console.log('The file users-callbacks-2.json has been saved!');
        console.timeEnd("WRITING_TO_FILE2");

        console.log("Starting to save file 3");
        console.time("WRITING_TO_FILE3");
        fs.writeFile(fd3, jsonUsers,  (err) => {
            if (err) throw err;
            console.log('The file users-callbacks-3.json has been saved!');
            console.timeEnd("WRITING_TO_FILE3");
        });
    });
});

console.log("I got to the end before saving files");

// writeFile is executed, then console.log1 and start writeFile2
// when writeFile2 is executed then console.log2