const tasksModel = require("../models/tasks");

const tasksServices = {};

tasksServices.get = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      let perPage = 2;
      let page = 0;

      if (params.perPage) {
        perPage = params.perPage;
      }

      if (params.page) {
        page = params.page - 1;
      }
      let payload = { user: params.userId };
      if (params.hasOwnProperty("isActive")) {
        payload.isActive = params.isActive;
        console.log(payload);
      } else {
        payload.isActive = true;
      }
      console.log(payload);
      const totalTasks = await tasksModel().find(payload).count();
      const tasks = await tasksModel()
        .find(payload)
        .skip(perPage * page)
        .limit(perPage);
      resolve({
        totalTasks,
        tasks,
        pages: totalTasks / perPage,
        currentPage: page,
      });
    } catch (error) {
      reject(error);
    }
  });
};

tasksServices.create = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const task = await tasksModel().create({
        user: params.userId,
        taskName: params.taskName,
        taskDate: params.taskDate,
      });
      resolve(task);
    } catch (error) {
      reject(error);
    }
  });
};

tasksServices.update = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        _id: params.taskId,
      };
      let payload = {};

      Object.keys(params).forEach((element) => {
        payload[element] = params[element];
      });
      const task = await tasksModel().updateOne(filter, payload);
      resolve(task);
    } catch (error) {
      reject(error);
    }
  });
};

tasksServices.delete = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filter = {
        _id: params.taskId,
      };
      let payload = { isActive: false };
      const task = await tasksModel().updateOne(filter, payload);
      resolve(task);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = tasksServices;
