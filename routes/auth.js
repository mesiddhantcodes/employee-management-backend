var express = require("express");
var router = express.Router();
const AuthenticationController = require("../controller/Authentication.controller");

router.post("/login", AuthenticationController.loginUser);
router.post("/register", AuthenticationController.registerUser);
module.exports = router;
