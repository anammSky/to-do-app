const { Task } = require("../db/models");

async function validateTaskId(req, resp, next) {
    req.task = await Task.findByPk(req.params.taskId);
    if (req.task === null) {
        resp.status(404).json({ message: "Task Not Found" });
        return;
    }
    next();
}

module.exports = validateTaskId;
