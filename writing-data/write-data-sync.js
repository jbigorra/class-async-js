const fs = require("fs");
const users = require("./generate-users");

console.time("WRITING_TO_FILES");

const jsonUsers = JSON.stringify(users);
const fd = fs.openSync('users-sync-1.json', 'w+');
const fd2 = fs.openSync('users-sync-2.json', 'w+');


console.log("Writing to file users.json")

const bytesWritten = fs.writeSync(fd, jsonUsers);

console.log("Writing to file users-copy-json");

const bytesWritten2 = fs.writeSync(fd2, jsonUsers);

console.log({bytesWritten, bytesWritten2});

console.timeEnd("WRITING_TO_FILES");

