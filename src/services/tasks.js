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
        pages: Math.ceil(totalTasks / perPage),
        currentPage: params.page,
      });
    } catch (error) {
      reject(error);
    }
  });
};

tasksServices.create = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const d = new Date(params.taskDate);
      const task = await tasksModel().create({
        user: params.userId,
        taskName: params.taskName,
        taskDate: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`,
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

tasksServices.reArrange = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const taskIDs = params.tasks
        .map((x) => {
          return x._id;
        })
        .sort();

      const tasks = params.tasks.map((x, index) => {
        return {
          ...x,
          _id: taskIDs[index],
        };
      });

      for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        await tasksModel().updateOne({ _id: element._id }, element);
      }
      resolve("Task Rearranged");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = tasksServices;
