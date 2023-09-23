var bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const AuthenticationMiddleware = require("../middleware/authentication.middleware");
const {
  sendEmail,
  decodeEmailToken,
} = require("../utils/emailVerification.utils");

const AuthController = {
  loginUser: async (req, res) => {
    var { email, password } = req.body;
    let ifUserFounded = await UserModel.findOne({ email: email });
    if (!ifUserFounded) {
      return res.send("User not found");
    }
    if (!ifUserFounded.isEmailVerified) {
      return res.send("Email is not verified");
    }
    let isPasswordMatched = await bcrypt.compare(
      password,
      ifUserFounded.password
    );
    if (!isPasswordMatched) {
      return res.send("Password is not matched");
    } else {
      const token = AuthenticationMiddleware.generateToken(ifUserFounded);
      return res.send({
        status: "success",
        data: ifUserFounded,
        token,
      });
    }
  },
  registerUser: async (req, res) => {
    var { email, employeeName, phoneNumber, dob, password, userName } =
      req.body;
    let ifUserFounded = await UserModel.findOne({ email: email });
    if (ifUserFounded) {
      return res.send("User already exist");
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new UserModel({
      employeeName: employeeName,
      phoneNumber: phoneNumber,
      dob: dob,
      password: hashedPassword,
      userName: userName,
      email: email,
    });
    let dataSaved = await user.save();
    if (dataSaved) {
      const token = AuthenticationMiddleware.generateToken({
        email: email,
      });
      const isMailSent = await sendEmail(email, token);
      if (!isMailSent) {
        return res.send("Email is not sent");
      }
      return res.send("User registered successfully please verify your email");
    } else {
      return res.send(
        "Somthing went wrong user is not registered due to error"
      );
    }
  },
  verifyEmail: async (req, res) => {
    const { token } = req.params;
    const decodedToken = await AuthenticationMiddleware.verifyEmailToken(token);
    if (decodedToken) {
      let ifUserFounded = await UserModel.findOne({
        email: decodedToken.email,
      });
      if (ifUserFounded) {
        ifUserFounded.isEmailVerified = true;
        let isUserSaved = await ifUserFounded.save();
        if (isUserSaved) {
          return res.send("Email verified successfully");
        } else {
          return res.send("Something went wrong");
        }
      } else {
        return res.send("User not found");
      }
    } else {
      return res.send("Token is not valid");
    }
  },
};

module.exports = AuthController;
