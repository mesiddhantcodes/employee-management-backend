var express = require("express");
const TaskController = require("../controller/Task.controller");
const AuthenticationMiddleware = require("../middleware/authentication.middleware");
var router = express.Router();

router.post(
  "/create",
  AuthenticationMiddleware.authenticate,
  TaskController.create
);

router.get(
  "/getTaskById/:taskId",
  AuthenticationMiddleware.authenticate,
  TaskController.getTaskById
);

router.get(
  "/getTasksByProjectId/:projectId",
  AuthenticationMiddleware.authenticate,
  TaskController.getTasksByProjectId
);

router.put(
  "/updateTaskById/:taskId",
  AuthenticationMiddleware.authenticate,
  TaskController.updateTaskById
);

module.exports = router;
