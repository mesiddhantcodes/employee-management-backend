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
  "/getProjectByUser",
  AuthenticationMiddleware.authenticate,
  ProjectController.getProjectByUser
);
router.post(
  "/assignProjectToUser",
  AuthenticationMiddleware.authenticate,
  ProjectController.assignProjectToUser
);

router.put(
  "/updateProject/:projectId",
  AuthenticationMiddleware.authenticate,
  ProjectController.updateProjectById
);

module.exports = router;
