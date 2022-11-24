const { User, Task, Tag } = require("./models/index");
const db = require("./db");
const bcrypt = require('bcrypt')

async function seedUsers() {
    return await User.bulkCreate([
        {
            name: "Julie",
            password: await bcrypt.hash("jB3an_1997", await bcrypt.genSalt(10)),
            email: "juliepadgett8008@icloud.com",
        },
        {
            name: "Oliver",
            password: await bcrypt.hash("060593Olij", await bcrypt.genSalt(10)),
            email: "ollieball1337@gmail.com",
        },
        {
            name: "Alex",
            password: await bcrypt.hash("4lex!sCoOl", await bcrypt.genSalt(10)),
            email: "alexwinter26@gmail.com",
        },
    ]);
}

async function seedTasks() {
    return await Task.bulkCreate([
        {
            title: "Shopping List",
            content: "Sainsbury's weekly shopping list.",
            finishBy: "2022-11-31 16:30",
        },
        {
            title: "House Work",
        },
        {
            title: "Christmas Shopping",
            content:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo illo nam impedit, amet tempore delectus consequuntur temporibus ratione consectetur accusamus corporis culpa illum inventore quasi reprehenderit aspernatur minima reiciendis sit. Ea praesentium ut adipisci, recusandae incidunt molestiae ullam? Quam facilis totam alias ullam expedita quos accusantium omnis ipsum, modi libero.",
        },
        {
            title: "Work Project",
            finishBy: "2022-12-14 09:30",
        },
    ]);
}

async function seedTags() {
    return await Tag.bulkCreate([
        {
            name: "Shopping",
        },
        {
            name: "Holiday",
        },
        {
            name: "Work",
        },
        {
            name: "House",
        },
    ]);
}

async function seed() {
    await db.sync({
        force: true,
    });

    // Bulk create users
    const users = await seedUsers();

    // Bulk create tasks
    const tasks = await seedTasks();

    // Assigning tasks to users
    users[0].addTask(tasks[0]);
    users[0].addTask(tasks[1]);
    users[1].addTask(tasks[2]);
    users[0].addTask(tasks[3]);

    // Bulk create tags
    const tags = await seedTags();

    // Assigning tags to tasks
    tasks[0].addTag(tags[0]);
    tasks[0].addTag(tags[1]);
    tasks[3].addTag(tags[2]);
    tasks[2].addTag(tags[1]);
}

seed()

module.exports = seed;
