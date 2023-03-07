const express = require("express");
const apis = require("./config/config");

const app = express();

let PORT = process.env.PORT;

if (PORT == null || PORT == "") {
  PORT = 8000;
}

apis.app.use("/check", (req, res) => res.send("Hi from new API"));

apis.app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
