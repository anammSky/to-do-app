const { Task } = require("../db/models");

function validateTaskId(req, resp, next) {
    req.task = Task.findByPk(req.taskId);
    if (req.task === null) {
        resp.status(404).json({ message: "Task Not Found" });
        return;
    }
    next();
}

module.exports = validateTaskId;
