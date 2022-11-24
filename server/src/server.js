const cors = require("cors");
const express = require("express");
const { authRouter, seedRouter, taskRouter } = require("./routes/");

const app = express();

process.env.JWT_SECRET = "MY-SUPER-SECRET-SECRET";

app.use(cors());
app.use(express.json());
app.use("/", authRouter, seedRouter, taskRouter);

app.listen(5001, async () => {
    console.log("Listening on port 5001");
});
