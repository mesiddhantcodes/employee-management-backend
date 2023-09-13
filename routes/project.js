var express = require("express");
var router = express.Router();
const ProjectController = require("../controller/Project.controller");
const AuthenticationMiddleware = require("../middleware/authentication.middleware");

router.post(
  "/create",
  AuthenticationMiddleware.authenticate,
  ProjectController.create
);
router.get(
  "/getAllProjects",
  AuthenticationMiddleware.authenticate,
  ProjectController.getAllProjects
);
router.get(
  "/getProjectById/:projectId",
  AuthenticationMiddleware.authenticate,
  ProjectController.getProjectById
);
router.get(
  "/getProjectByUserId/:userId",
  AuthenticationMiddleware.authenticate,
  ProjectController.getProjectByUserId
);
router.post(
  "/assignProjectToUser",
  AuthenticationMiddleware.authenticate,
  ProjectController.assignProjectToUser
);

module.exports = router;
