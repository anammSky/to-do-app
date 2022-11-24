const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { Tag } = require("../db/models");
const validateTagId = require("../middleware/tag");
const router = Router();

router.get("/tags", async (_, resp) => {
    resp.json({
        message: "Successfully fetched all tags",
        result: await Tag.findAll(),
    });
});

router.delete("/tags", async (_, resp) => {
    await Tag.destroy({ where: {} });
    resp.json({ message: "Successfully deleted all tags" });
});

router.post(
    "/tags",
    body("title").custom(value => {
        if (typeof value !== "string") throw new Error("tag title must be a string");
        if (value.length === 0) throw new Error("tag title cannot be empty");
        if (value.length > 20) throw new Error("tag title cannot be more than 20 characters");
        return true;
    }),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        return resp.status(201).json({
            message: "Successfully created tag",
            result: await Tag.create({ title: req.body.title }),
        });
    }
);

router.get("/tag/:tagId", validateTagId, async (req, resp) => {
    resp.json({
        message: "Successfully fetched tasks with the specified tag",
        result: await req.tag.getTasks(),
    });
});

router.delete("/tag/:tagId", validateTagId, async (req, resp) => {
    await Tag.destroy({ where: { id: req.tag.id } });
    resp.json({ message: "Successfully deleted tag" });
});

router.patch(
    "/tag/:tagId",
    validateTagId,
    body("title").custom(value => {
        if (value === undefined) throw new Error("new title must be provided when updating a tag");
        if (typeof value !== "string") throw new Error("new title must be a string");
        if (value.length === 0) throw new Error("new title cannot be empty");
        if (value.length > 20) throw new Error("new title cannot be more than 20 characters");
        return true;
    }),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return resp.status(400).json({ errors: errors.array() });
        }
        await Tag.update({ title: req.body.title }, { where: { id: req.tag.id } });
        resp.json({ message: "Successfully updated tag title" });
    }
);

module.exports = router;
