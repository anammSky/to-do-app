const { Router } = require("express");
const { User } = require("../db/models");
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

module.exports = router;
