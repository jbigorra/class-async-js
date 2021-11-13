const sampleUser = {
    "firstName": "Rack",
    "lastName": "Jackon",
    "gender": "man",
    "age": 24,
    "address": {
        "streetAddress": "126",
        "city": "San Jone",
        "state": "CA",
        "postalCode": "394221"
    },
    "phoneNumbers": [
        { "type": "home", "number": "7383627627" }
    ]
}

function createUsers(amountOfUsers = 100000) {
    console.time("GENERATING_USERS");
    const usersJson = []
    for (let i = 0; i < amountOfUsers; i++) {
        const newUser = {...sampleUser};
        newUser.id = i + 1
        usersJson.push(newUser);
    }

    console.timeEnd("GENERATING_USERS");

    return usersJson;
}


const users = createUsers();

module.exports = {
    users,
    createUsers
};