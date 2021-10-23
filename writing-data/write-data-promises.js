const fs = require("fs/promises");
const users = require("./generate-users");

// https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_filehandle_writefile_data_options
const jsonUsers = JSON.stringify(users);


// function saveFile1() {
//     console.time("save file 1");
//     console.log("starting to save file 1");
//     return fs.writeFile("users-promises-1.json", jsonUsers);
// }
//
// function saveFile2With(message) {
//     return function () {
//         console.timeEnd("save file 1");
//
//         console.time("save file 2");
//         console.log(message);
//         return fs.writeFile("users-promises-2.json", jsonUsers);
//     }
// }
//
// function saveFile3() {
//         console.timeEnd("save file 2");
//
//         console.time("save file 3");
//         console.log("starting to save file 3");
//         return fs.writeFile("users-promises-3.json", jsonUsers)
//                 .then(() => console.timeEnd("save file 3"))
// }
// Save files one after the other

// saveFile1()
//     // if we want to call another, we need to return a PROMISE so then we can chain another .then()
//     .then(saveFile2With("Starting to save file 2"))
//     .then(() => saveFile3())
//     .then(() => console.log("Finished saving all files"));

// Save all files in parallel

function saveFile1() {
    console.time("save file 1");
    console.log("starting to save file 1");
    return fs.writeFile("users-promises-1.json", jsonUsers)
        .then(()=> {
            console.timeEnd("save file 1")
        })
        .then(() => "Hello 1");
}

function saveFile2With(message) {
    return function () {
        console.time("save file 2");
        console.log(message);
        return fs.writeFile("users-promises-2.json", jsonUsers)
            .then(()=> {
                console.timeEnd("save file 2")
            })
            .then(() => "Hello 2");
    }
}

function saveFile3() {
        console.time("save file 3");
        console.log("starting to save file 3");
        return fs.writeFile("users-promises-3.json", jsonUsers)
                .then(() => console.timeEnd("save file 3"))
                .then(() => "Hello 3");
}

// Promise.all([
//     saveFile1(),
//     saveFile2With("starting saving file 2")(),
//     saveFile3()
// ]).then((arr) => {
//     console.log(arr);
//     console.log("Finished saving all files")
// });

// Promise.race([
//     saveFile1(),
//     saveFile2With("starting saving file 2")(),
//     saveFile3()
// ]).then((arr) => {
//     console.log(arr);
//     console.log("Finished saving all files")
// });

Promise.allSettled([
    saveFile1(),
    saveFile2With("starting saving file 2")(),
    saveFile3()
]).then((arr) => {
    console.log(arr);
    console.log("Finished saving all files")
});

// always execute

console.log("Got to the end before finishing saving the files!")