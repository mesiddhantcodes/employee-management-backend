var mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
  },
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Task",
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isCreatedAt: {
    type: Date,
    default: new Date(),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: false,
  },
  aadharNumber: {
    type: String,
    // here we store a image by using bucket or using multer(store the file at folder and make a id of name of using)
    required: false,
  },
  panCard: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  projects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Project",
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
