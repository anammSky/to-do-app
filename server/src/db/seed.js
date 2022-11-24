const { User, Task } = require("./models/index");
const db = require("./db");

async function seedTask() {
    // Creating Tasks
    await Task.bulkCreate([
        {
            title: "Shopping List",
            content: "Sainsbury's weekly shopping list.",
            finishBy: "2022-11-31 16:30",
            UserId: 1,
        },
        {
            title: "House Work",
            UserId: 2,
        },
        {
            title: "Christmas Shopping",
            content: "All gifts that need buying for christmas.",
            UserId: 2,
        },
        {
            title: "Work Project",
            finishBy: "2022-12-14 09:30",
            UserId: 1,
        },
        {
            title: "Holiday Planner",
            content: "Everything needed before our holiday",
            finishBy: "2023-08-03 04:15",
            UserId: 1,
        },
    ]);
}

async function seedUser() {
    //Creating Users
    User.bulkCreate([
        {
            name: "Julie",
            password: "jB3an_1997",
            email: "juliepadgett8008@icloud.com",
        },
        {
            name: "Oliver",
            password: "060593Olij",
            email: "ollieball1337@gmail.com",
        },
    ]);
}

async function seed() {
    await db.sync({
        force: true,
    });

    await seedUser();
    await seedTask();
}

module.exports = seed;
