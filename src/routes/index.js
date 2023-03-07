const express = require("express");

const router = express.Router();

const authRoute = require("../routes/auth");
const tasksRoute = require("../routes/tasks");

router.use("/auth", authRoute);
router.use("/tasks", tasksRoute);

module.exports = router;
