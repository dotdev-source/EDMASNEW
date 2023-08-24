const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Student = require("../../models/academic/Student");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const {
  passwordHashed,
  isPasswordMatched,
  hashedPassword,
} = require("../../utils/helpers");
const { response } = require("../../app/app");

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
// Route GET api/students/profile
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

//Get All Students
// Route GET api/students/
// access = Private
exports.getAllStudentByAdmin = asyncHandler(async (req, res) => {
  const students = await Student.find();

  res.status(200).json({
    status: "success",
    message: "Students fetched successfully",
    data: students,
  });
});

// Get Single Student
// Route GET api/students/:teacherId/admin
// access = Private
exports.getStudentByAdmin = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId);

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

// Get Teacher Viewing his own profile
// Route GET api/students/profile
// access = Private
exports.getTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!teacher) {
    throw new Error(`Teacher Not Found`);
  } else {
    res.status(200).json({
      status: "success",
      message: "Teacher fetched successfully",
      data: teacher,
    });
  }
});

// Update Teacher
// Route PUT api/students/:id/update
// access = Private Student Only
exports.studentUpdateProfile = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("User not found");
  }
  //Check if the user is updating their password
  if (password) {
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: await hashedPassword(password) },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully",
    });
  } else {
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      { email },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "Student updated successfully",
    });
  }
});

// Admin Update student
// Route PUT api/student/:studentId/update/admin
// access = Private Admin Only
exports.adminUpdateStudent = asyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, name, email, prefectName } =
    req.body;

  //Find the student by Id
  const studentFound = await Student.findById(req.params.studentId);
  if (!studentFound) {
    throw new Error(`Student not found`);
  }

  // Update
  studentUpdated = await Student.findByIdAndUpdate(
    req.params.studentId,
    {
      $set: { academicYear, program, name, email, prefectName },
      $addToSet: { classLevels },
    },
    { new: true }
  );

  //Send response
  res.status(200).json({
    status: "success",
    data: studentUpdated,
    message: "Student updated successfully",
  });
});
