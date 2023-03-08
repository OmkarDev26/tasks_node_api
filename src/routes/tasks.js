const express = require("express");

const router = express.Router();
const tasksController = require("../controllers/tasks");
const validatedUser = require("../helper/authCheck");

router.post("/get", validatedUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await tasksController.get(payload);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/create", validatedUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await tasksController.create(payload);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/update", validatedUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await tasksController.update(payload);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/delete", validatedUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await tasksController.delete(payload);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/reArrange", validatedUser, async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await tasksController.reArrange(payload);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
