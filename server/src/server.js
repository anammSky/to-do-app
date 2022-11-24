const cors = require("cors");
const express = require("express");
const { seedRouter, taskRouter } = require("./routes/");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", seedRouter, taskRouter);

app.listen(5001, async () => {
    console.log("Listening on port 5001");
});
