const Task = require("./task.model");
const User = require("./user.model");
const Tag = require("./tag.model");

Tag.belongsToMany(Task, { through: "Task-Tag", timestamps: false });
Task.belongsToMany(Tag, { through: "Task-Tag", timestamps: false });

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { Task, User, Tag };
