const tasksController = {};
const tasksServices = require("../services/tasks");

tasksController.get = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await tasksServices.get(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

tasksController.create = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await tasksServices.create(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

tasksController.update = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await tasksServices.update(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

tasksController.delete = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await tasksServices.delete(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = tasksController;
