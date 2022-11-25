const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { User, Task } = require("../db/models");
const validateUserId = require("../middleware/user");
const router = Router();

router.get("/users", async (_, resp) => {
    resp.json({ message: "Successfully fetched all users", result: await User.findAll() });
});

router.delete("/users", async (_, resp) => {
    await User.destroy({ where: {} });
    resp.json({ message: "Successfully deleted all users" });
});

router.get("/user/:userId", validateUserId, async (req, resp) => {
    resp.json({ message: "Successfully fetched user", result: req.user });
});

router.delete("/user/:userId", validateUserId, async (req, resp) => {
    await User.destroy({ where: { id: req.user.id } });
    resp.json({ message: "Successfully deleted user" });
});

router.get("/user/:userId/tasks", validateUserId, async (req, resp) => {
    resp.json({ message: "Successfully fetched user's tasks", result: await req.user.getTasks() });
});

router.post(
    "/user/:userId/tasks",
    validateUserId,
    body("title").custom(value => {
        if (value === undefined) throw new Error("Task must have a title");
        if (typeof value !== "string") throw new Error("Task title must be a string");
        if (value.length === 0) throw new Error("Task title cannot be empty");
        if (value.length > 20) throw new Error("Task title cannot be more than 20 characters");
        return true; // title is valid
    }),
    body("content").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "string") throw new Error("Task content must be a string");
        return true; // content is valid
    }),
    body("isComplete").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "boolean") throw new Error("Task completion status must be a boolean");
        return true; // isComplete is valid
    }),
    body("finishBy").custom(value => {
        if (value === undefined) return true; // doesn't technically have to be passed
        if (typeof value !== "string") throw new Error("Task finish-by must be a string");

        const invalidFinishMsg = "Task finish-by date must be in format YYYY-mm-dd HH:MM";
        if (value.length !== 16) throw new Error(invalidFinishMsg);
        if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)) throw new Error(invalidFinishMsg);
        return true; // finishBy is valid
    }),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            resp.status(400).json({ errors: errors.array() });
            return;
        }
        const task = await Task.create({
            title: req.body.title,
            content: req.body.content || null,
            isComplete: req.body.isComplete || null,
            finishBy: req.body.finishBy || null,
        });
        await req.user.addTask(task);
        resp.status(201).json({ message: "Successfully created task", result: task.toJSON() });
    }
);

module.exports = router;
