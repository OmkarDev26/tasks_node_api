const userAuthController = {};

const userAuthServices = require("../services/auth");

userAuthController.register = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await userAuthServices.register(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

userAuthController.findUser = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await userAuthServices.findUser(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = userAuthController;
