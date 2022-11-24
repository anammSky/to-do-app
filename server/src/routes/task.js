const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const validateTaskId = require("../middleware/task");
const { Task } = require("../db/models");

const router = Router();

router.get("/tasks", async (_, resp) => {
    resp.json({
        message: "Successfully fetched all tasks",
        result: await Task.findAll(),
    });
});

router.delete("/tasks", async (_, resp) => {
    resp.json({
        message: "Successfully deleted all tasks",
        result: await Task.destroy({ where: {} }),
    });
});

router.post("/tasks", async (_, resp) => {
    // Requires a login system so we can get the User
    resp.status(500).json({ message: "Endpoint not ready yet" });
});

router.get("/task/:taskId", validateTaskId, async (req, resp) => {
    resp.json({
        message: "Successfully retrieved task",
        result: req.task.toJSON(),
    });
});

router.patch(
    "/task/:taskId",
    validateTaskId,
    body("title").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "string") throw new Error("New title must be a string");
        if (value.length === 0) throw new Error("New title cannot be empty");
        if (value.length > 20) throw new Error("New title cannot be more than 20");
        return true; // title is valid
    }),
    body("content").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "string") throw new Error("New content must be a string");
        return true; // content is valid
    }),
    body("isComplete").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "boolean") throw new Error("New completion status must be a boolean");
        return true; // isComplete is valid
    }),
    body("finishBy").custom(value => {
        const invalidFinishMsg = "New finish-by date must be in format YYYY-mm-dd HH:MM";
        if (value === undefined) return true; // doesn't technically have to be passed
        if (value.length !== 16) throw new Error(errMsg);
        if (!/d{4}-d{2}-d{2} d{2}:d{2}/.test(value.toString())) throw new Error(invalidFinishMsg);
        return true;
    }),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        const toUpdate = {};
        if (req.get("title") !== undefined) toUpdate["title"] = req.get("title");
        if (req.get("content") !== undefined) toUpdate["content"] = req.get("content");
        if (req.get("isComplete") !== undefined) toUpdate["isComplete"] = req.get("isComplete");
        if (req.get("finishBy") !== undefined) toUpdate["finishBy"] = req.get("finishBy");
        resp.json({
            message: "Successfully updated task",
            result: await req.task.update(toUpdate),
        });
    }
);

router.delete("/task/:taskId", validateTaskId, async (req, resp) => {
    await Task.destroy({ where: { id: req.task.id } });
    resp.json({ message: "Successfully deleted task" });
});

module.exports = router;
