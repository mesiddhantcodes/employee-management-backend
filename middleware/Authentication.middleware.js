const jwt = require("jsonwebtoken");
const JWT_SECRET = "OUBADFOBWEQOFIBQEOIFBQEOIFBoqwbefouwbhrt9724grt297tg2937tg";
const AuthenticationMiddleware = {
  authenticate: (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  },
  generateToken: (user) => {
    let token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        employeeName: user.employeeName,
        phoneNumber: user.phoneNumber,
        dob: user.dob,
        userName: user.userName,
      },
      JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    return token;
  },
  verifyEmailToken: async (token) => {
    try {
      let decodedToken = decodeURIComponent(token);
      let decoded = jwt.verify(decodedToken, JWT_SECRET);
      return decoded;
    } catch (error) {
      return false;
    }
  },
};

module.exports = AuthenticationMiddleware;
