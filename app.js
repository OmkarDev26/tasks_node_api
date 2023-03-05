const express = require("express");
const apis = require("./config/config");

const app = express();

const PORT = 8000;

// apis.app.use("/", (req, res) => res.send("Hi from new API"));

apis.app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
