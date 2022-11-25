const { Tag } = require("../db/models");

async function validateTagId(req, resp, next) {
    req.tag = await Tag.findByPk(req.params.tagId);
    if (req.tag === null) {
        resp.status(404).json({ message: "Tag Not Found" });
        return;
    }
    next();
}

module.exports = validateTagId;
