const fs = require("fs").promises;
const fsSync = require("fs");
const { users, createUsers } = require("./generate-users");
const jsonUsers = JSON.stringify(users);

async function write() {
    console.time("WRITING_TO_FILES");

    console.log("Writing to file users.json")

    await fs.writeFile("users-async-1.json", jsonUsers);

    console.log("Finished writing file users-async-1.json");

    console.timeEnd("WRITING_TO_FILES");
}

async function read() { // Promise<Buffer> ---> encoded ---> Promise<string>
    try {
        const data = await fs.readFile("users-async-1.jso", {encoding: "utf8"});
        const usersArray = JSON.parse(data);
        console.log(`Finished reading fist file. File has ${usersArray.length}`);
    } catch (e) {
        console.log(e.message);
    }

    // const data = await fs.readFile("users-async-1.jso", {encoding: "utf8"});
    // const failedUsersArray = JSON.parse(data);
    // console.log(`Finished reading fist file. File has ${failedUsersArray.length}`);

    const usersStr = await fs.readFile("users-async-1.json", {encoding: "utf8"});
    const usersArray = JSON.parse(usersStr);
    console.log(`Finished reading second file. File has ${usersArray.length} users`);
}

async function run() {
    await write();
    await read();
}

console.log("Writing file hasn't finished");

// This stills run even if one of the promises (async/await) throws an error and is not handled
// console.log("Long process started");
// setTimeout(() => {
//     console.log("Long process finished");
// }, 3000);

run();

// const aLotMoreUsers = createUsers(1000000);
// fsSync.writeFileSync("lots-of-users-sync.json", JSON.stringify(aLotMoreUsers));
// const dataStr = fsSync.readFileSync("lots-of-users-sync.json", { encoding: "utf8" });
// const dataArray = JSON.parse(dataStr);
//
// console.log("finished sync code " + dataArray.length);


