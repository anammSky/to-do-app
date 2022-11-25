const { User } = require("../db/models");

async function validateUserId(req, resp, next) {
    req.user = await User.findByPk(req.params.userId);
    if (req.user === null) {
        resp.status(404).json({ message: "Account Not Found" });
        return;
    }
    next();
}

module.exports = validateUserId;
