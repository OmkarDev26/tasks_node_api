const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const user = await usersModel().findOne({
    $or: [{ email: req.body.email }, { _id: req.body.userId }],
  });
  if (user && user.token) {
    jwt.verify(user.token, "newSecretCheck", function (err, result) {
      if (err) {
        res.error.Unauthorized("Error", err);
      } else {
        next();
      }
    });
  } else {
    res.error.Unauthorized("Unauthorized Request");
  }
};
