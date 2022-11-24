const bcrypt = require("bcrypt");
const express = require("express");
const { body, validationResult } = require("express-validator");
const { createJWTToken } = require("../libs/auth");

const { User } = require("../db/models");

const router = express.Router();

router.post(
    "/signup",
    body("name").isString(),
    body("email")
        .isEmail()
        .custom(async value => {
            if ((await User.findOne({ email: value })) !== null) {
                throw new Error("email must be unique");
            }
            return true;
        }),
    body("password").custom(value => {
        let numCount = 0;
        let lowerCount = 0;
        let upperCount = 0;

        for (let char of value) {
            if (numCount > 0 && lowerCount > 0 && upperCount > 0) break;

            if (!isNaN(+char)) {
                numCount++;
                continue;
            }
            if (char === char.toLowerCase()) {
                lowerCount++;
                continue;
            }
            if (char === char.toUpperCase()) {
                upperCount++;
                continue;
            }
        }
        if (value.length < 5 || value.length > 40) {
            throw new Error("password must be 5-40 chars (inclusive)");
        }

        if (numCount === 0) {
            throw new Error("password must contain at least one number");
        }
        if (lowerCount === 0) {
            throw new Error("password must contain at least one lowercase letter");
        }
        if (upperCount === 0) {
            throw new Error("password must contain at least one uppercase letter");
        }
        return true;
    }),
    async (req, resp) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        try {
            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);

            // now we set user password to hashed password
            const hash = await bcrypt.hash(req.body.password, salt);

            const userData = { name: req.body.name, email: req.body.email, password: hash };
            const user = await User.create(userData);

            resp.status(201).json({
                message: "Successfully created account",
                result: user.toJSON(),
                token: createJWTToken({ sessionData: userData }),
            });
        } catch (exc) {
            resp.status(401).json({ message: exc.message });
        }
    }
);

router.post("/login", async (req, resp) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user === null) {
            resp.status(401).json({ message: "Invalid Email" });
            return;
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            // will automatically hash body's password and compare against stored hash
            resp.status(401).json({ message: "Invalid Password" });
            return;
        }
        resp.json({
            message: "Successfully logged in",
            token: createJWTToken({ sessionData: user }),
        });
    } catch (exc) {
        resp.status(500).json({ message: exc.message });
    }
});

router.get("/logout", (req, resp) => {
    if (req.cookies && req.cookies.token) {
        resp.clearCookie("token");
    }
    resp.json({ message: "Successfully signed out" });
});

module.exports = router;
