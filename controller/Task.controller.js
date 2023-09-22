const ProjectModel = require("../models/Project.model");
const TaskModel = require("../models/Task.model");
const UserModel = require("../models/User.model");

const TaskController = {
  create: async (req, res) => {
    const { taskName, taskDescription, createdBy, projectId } = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;
    try {
      checkIfUserExists = await UserModel.findOne({ _id: createdBy });
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
    } catch (err) {
      return res.status(400).send("User or project does not exists");
    }
    if (!checkIfUserExists || !checkIfProjectExists) {
      return res.status(400).send("User or project does not exists");
    }
    var task = new TaskModel({
      taskName,
      taskDescription,
      createdBy,
      projectId,
    });
    let ifTaskSaved = await task.save();
    if (!ifTaskSaved) {
      return res.status(500).send("Task not saved something went wrong");
    }
    return res.status(200).send("Task created successfully");
  },
  getTaskById: async (req, res) => {
    const { taskId } = req.params;
    let checkIfTaskExists;
    try {
      checkIfTaskExists = await TaskModel.findOne({
        _id: taskId,
        isDeleted: false,
      });
    } catch (err) {
      return res.status(400).send("Task does not exists");
    }
    if (!checkIfTaskExists) {
      return res.status(400).send("Task does not exists");
    }
    return res.status(200).send(checkIfTaskExists);
  },
  getTasksByProjectId: async (req, res) => {
    const { projectId } = req.params;
    let checkIfProjectExists;
    try {
      checkIfProjectExists = await ProjectModel.findOne({
        _id: projectId,
        isDeleted: false,
      });
    } catch (err) {
      return res.status(400).send("Project does not exists");
    }
    if (!checkIfProjectExists) {
      return res.status(400).send("Project does not exists");
    }
    let tasks = await TaskModel.find({
      projectId: projectId,
      isDeleted: false,
    });
    tasks = tasks.map((task) => task._id);
    return res.status(200).send(tasks);
  },
  updateTaskById: async (req, res) => {
    var { taskId } = req.params;
    var { taskName, taskDescription, taskDeadline, assignedTo, status } =
      req.body;
    let checkIfTaskExists;
    try {
      checkIfTaskExists = await TaskModel.findOne({
        _id: taskId,
        isDeleted: false,
      });
    } catch (err) {
      return res.status(400).send("Task does not exists");
    }
    if (!checkIfTaskExists) {
      return res.status(400).send("Task does not exists");
    }
    let updateTask = await TaskModel.updateOne(
      { _id: taskId },
      {
        taskName,
        taskDescription,
        taskDeadline,
        assignedTo,
        status,
        updatedAt: new Date(),
      }
    );
    if (!updateTask) {
      return res.status(500).send("Task not updated something went wrong");
    }
    return res.status(200).send("Task updated successfully");
  },
  deleteTaskById: async (req, res) => {
    var { taskId } = req.params;
    let checkIfTaskExists;
    checkIfTaskExists = await TaskModel.findOne({
      _id: taskId,
      isDeleted: false,
    });
    try {
      checkIfTaskExists = await TaskModel.findOne({ _id: taskId });
    } catch (err) {
      return res.status(400).send("Task does not exists");
    }
    checkIfTaskExists.isDeleted = true;
    let updateTask = await checkIfTaskExists.save();
    if (!updateTask) {
      return res.status(500).send("Task not deleted something went wrong");
    }
    return res.status(200).send("Task deleted successfully");
  },
};

module.exports = TaskController;
