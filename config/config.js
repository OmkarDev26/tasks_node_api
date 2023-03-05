const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./mongodb");

const app = express();
const router = require("../src/routes/index");

const responseHandler = require("express-response-handler");
const customCodes = [
  ["Unauthorized", "error", 209],
  ["success", "success", 200],
  ["Created", "success", 201],
  ["Accepted", "success", 202],
  ["Updated", "success", 203],
  ["NoContent", "success", 204],
  ["ResetContent", "success", 205],
  ["PartialContent", "success", 206],
  ["Deleted", "success", 207],
  ["PartialContent", "error", 208],
  ["AlreadyExists", "error", 409],
  ["Default", "error", 500],
];
app.use(responseHandler(customCodes));

app.use(bodyParser.json());

app.use("/api", router);

var ApiConfig = {
  app: app,
};

// app.use("/");

module.exports = ApiConfig;
