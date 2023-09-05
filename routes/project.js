var express = require('express');
var router = express.Router();
var Project = require('../models/Project.model');
const UserModel = require('../models/User.model');

router.post("/create", async (req, res) => {
    var { projectName, projectDescription, createdBy } = req.body;
    let checkIfUserExists;
    try {
        checkIfUserExists = await UserModel.findOne({ _id: createdBy });
    }
    catch (err) {
        return res.status(400).send("User does not exists");
    }
    if (!checkIfUserExists) {
        return res.status(400).send("User does not exists");
    }
    var project = new Project({
        projectName,
        projectDescription,
        createdBy
    });
    let ifProjectSaved = await project.save();
    if (!ifProjectSaved) {
        return res.status(500).send("Project not saved something went wrong");
    }
    return res.status(200).send("Project created successfully");


})

router.get("/getAllProjects", async (req, res) => {
    let allProjects = await Project.find({ isDeleted: false });
    if (!allProjects) {
        return res.status(500).send("Something went wrong");
    }
    return res.status(200).send(allProjects);
});

router.get("/getProjectById/:projectId", async (req, res) => {
    let { projectId } = req.params;
    let project = await Project.findOne({ _id: projectId, isDeleted: false });
    if (!project) {
        return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);

});



router.get("/getProjectByUserId/:userId", async (req, res) => {
    let { userId } = req.params;
    let project = await Project.find({ projectMembers: userId, isDeleted: false }); //try catch add krna hai
    if (!project) {
        return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);


});

router.post("/assignProjectToUser", async (req, res) => {
    var { projectId, userId } = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;
    try {
        checkIfUserExists = await UserModel.findOne({ _id: userId });
        checkIfProjectExists = await Project.findOne({ _id: projectId });
    }
    catch (err) {
        return res.status(404).send("User or Project does not exists");
    }
    if (checkIfProjectExists.projectMembers.includes(userId)) return res.status(409).send("User already assigned to this project");
    checkIfProjectExists.projectMembers.push(userId);
    checkIfUserExists.projects.push(projectId);
    let ifProjectSaved = await checkIfProjectExists.save();
    let ifUserSaved = await checkIfUserExists.save();
    if (!ifProjectSaved || !ifUserSaved) {
        return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Project assigned successfully");


})

module.exports = router;

