const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { randomBytes } = require("crypto");
const userAuthServices = {};

userAuthServices.register = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashedPassword;
      const salt = randomBytes(32);

      if (params.password) {
        hashedPassword = await argon2.hash(params.password, { salt });
      }
      const user = await usersModel().create({
        email: params.email.trim(),
        password: hashedPassword,
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

userAuthServices.findUser = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await usersModel().find({
        email: params.email,
        verified: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

userAuthServices.login = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await usersModel().find({
        email: params.email,
        verified: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = userAuthServices;
