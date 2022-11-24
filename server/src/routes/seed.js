const { Router } = require("express");
const seed = require("../db/seed");

const router = Router();

router.get("/seed", async (_, resp) => {
    await seed();
    resp.json({ message: "Successfully seeded the database." });
});

module.exports = router;
