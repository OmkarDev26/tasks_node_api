const express = require("express");

const router = express.Router();
const userAuthController = require("../controllers/auth");

router.post("/register", async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await userAuthController.register(payload);
    // res.send(data);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/findUser", async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await userAuthController.findUser(payload);
    // res.send(data);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await userAuthController.login(payload);
    // res.send(data);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
    };
    const data = await userAuthController.verify(payload);
    // res.send(data);
    res.success.success("Request Acknowledge", data);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = router;
