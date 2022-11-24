const Task = require('./task.model');
const User = require('./user.model');

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { Task, User };