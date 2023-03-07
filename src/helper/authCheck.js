const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const user = await usersModel().findOne({ email: req.body.email });
  jwt.verify(user.token, "newSecretCheck", function (err, result) {
    if (err) {
      res.json({ res: err });
    } else {
      next();
    }
  });
};
