const ProjectModel = require("../models/Project.model");
const UserModel = require("../models/User.model");

const ProjectController = {
  create: async (req, res) => {
    var { projectName, projectDescription } = req.body;
    let checkIfUserExists;
    var createdBy = req.user.id;
    try {
      checkIfUserExists = await UserModel.findOne({ _id: createdBy });
    } catch (err) {
      return res.status(400).send("User does not exists");
    }
    if (!checkIfUserExists) {
      return res.status(400).send("User does not exists");
    }
    var project = new ProjectModel({
      projectName,
      projectDescription,
      createdBy,
    });
    let ifProjectSaved = await project.save();
    if (!ifProjectSaved) {
      return res.status(500).send("Project not saved something went wrong");
    }
    return res.status(200).send("Project created successfully");
  },
  getAllProjects: async (req, res) => {
    let allProjects = await Project.find({ isDeleted: false });
    if (!allProjects) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(200).send(allProjects);
  },
  getProjectById: async (req, res) => {
    let { projectId } = req.params;
    let project = await ProjectModel.findOne({
      _id: projectId,
      isDeleted: false,
    });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
  },
  getProjectByUser: async (req, res) => {
    let userId = req.user.id;
    let project;
    try {
      project = await ProjectModel.find({
        projectMembers: userId,
        isDeleted: false,
      });
      return res.status(200).send(project);
    } catch (err) {
      return res.status(404).send("Project not found");
    }
  },
  assignProjectToUser: async (req, res) => {
    var { projectId, userId } = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;
    try {
      checkIfUserExists = await UserModel.findOne({ _id: userId });
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
    } catch (err) {
      return res.status(404).send("User or Project does not exists");
    }
    if (checkIfProjectExists.projectMembers.includes(userId))
      return res.status(409).send("User already assigned to this project");
    checkIfProjectExists.projectMembers.push(userId);
    checkIfUserExists.projects.push(projectId);
    let ifProjectSaved = await checkIfProjectExists.save();
    let ifUserSaved = await checkIfUserExists.save();
    if (!ifProjectSaved || !ifUserSaved) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Project assigned successfully");
  },
  updateProjectById: async (req, res) => {
    var { projectId } = req.params;
    var { projectName, projectDescription, isCompleted, projectMembers } =
      req.body;
    let checkIfProjectExists;
    try {
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
    } catch (err) {
      return res.status(404).send("Project does not exists");
    }
    if (projectMembers) {
      if (projectMembers.length > 0) {
        let combinedProjectMember = [
          ...projectMembers,
          ...checkIfProjectExists.projectMembers,
        ];
        let uniqueProjectMember = new Set(combinedProjectMember);
        uniqueProjectMember = Array.from(uniqueProjectMember);
        checkIfProjectExists.projectMembers = uniqueProjectMember;
      }
    }
    if (projectName) checkIfProjectExists.projectName = projectName;
    if (projectDescription)
      checkIfProjectExists.projectDescription = projectDescription;
    if (isCompleted) checkIfProjectExists.isCompleted = isCompleted;
    checkIfProjectExists.updatedAt = Date.now();
    checkIfProjectExists.updatedBy = req.user.id;
    let ifProjectSaved = await checkIfProjectExists.save();
    if (!ifProjectSaved) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Project updated successfully");
  },
};

module.exports = ProjectController;
