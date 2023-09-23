var express = require("express");
var router = express.Router();
const AuthenticationController = require("../controller/Authentication.controller");

router.post("/login", AuthenticationController.loginUser);
router.post("/register", AuthenticationController.registerUser);
router.get("/verify/:token", AuthenticationController.verifyEmail);
module.exports = router;
