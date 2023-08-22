const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Student = require("../../models/academic/Student");
const Teacher = require("../../models/staff/Teacher");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const {
  passwordHashed,
  isPasswordMatched,
  hashedPassword,
} = require("../../utils/helpers");


// Admin Register Student
// Route POST api/v1/student/admin/register
// access = Private AdminOnly
exports.adminRegisterStudent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    //check if Student exist
    const studentExist = await Student.findOne({ email });
    if (studentExist) {
      throw new Error("Student Exist");
    }
    //Register Student
    const studentCreated = await Student.create({
      name,
      email,
      password: await hashedPassword(password),
    });
    res.status(201).json({
      status: "success",
      data: studentCreated,
      message: "Student created successfully",
    });
  });

// Teacher Login
// Route POST api/student/login
// access = public
exports.studentLogin = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

//   //Find the user
   const user = await Student.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid Login Credentials" });
   }

  // Verified password
  const isMatched = await isPasswordMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid Credentials" });
  } else {
    return res.status(200).json({
      status: "success",
      data: generateToken(user._id),
      message: "Student logged in successfully",
    });
  }
});

// Student Viewing his own profile
// Route GET api/student/profile
// access = Private
exports.getStudentProfile = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.userAuth?._id).select(
      "-password -createdAt -updatedAt"
    );
  
    if (!student) {
      throw new Error(`Student Not Found`);
    } else {
      res.status(200).json({
        status: "success",
        message: "Student fetched successfully",
        data: student,
      });
    }
  });
 

exports.getAllStudent = asyncHandler(async (req, res) => {
    const students = await Student.find();
  
    res.status(200).json({
      status: "success",
      message: "Teachers fetched successfully",
      data: students,
    });
  });

  