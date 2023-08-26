const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../models/staff/Admin");
const Teacher = require("../../models/staff/Teacher");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const {
  passwordHashed,
  isPasswordMatched,
  hashedPassword,
} = require("../../utils/helpers");

// Admin Register Teacher
// Route POST api/v1/teachers/admin/register
// access = Private
exports.adminRegisterTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if Teacher exist
  const teacherExist = await Teacher.findOne({ email });
  if (teacherExist) {
    throw new Error("Teacher Exist");
  }
  //Register Teacher
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: await hashedPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: teacherCreated,
    message: "Teacher created successfully",
  });
});

// Teacher Login
// Route POST api/teachers/login
// access = public
exports.teachersLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Find the user
  const user = await Teacher.findOne({ email });
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
      message: "Teacher logged in successfully",
    });
  }
});

// Get All Teachers
// Route GET api//teachers/admin
// access = Private

exports.getAllTeachers = asyncHandler(async (req, res) => {
  //convert query string to number
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  //Get Total Record
  const totalTeachers = await Teacher.countDocuments();
  const startIndex = (page -1 ) * limit
  const endIndex = page * limit;

  //pagination result
  const pagination = {};

 // add next
  if (endIndex < totalTeachers) {
    pagination.next ={
      page: page + 1,
      limit
    }
  }

  //Add previous
  if (startIndex > 0) {
    pagination.prev ={
      page: page - 1,
      limit
    }
  }

  //Execute Query
  const teachers = await Teacher.find().skip(skip).limit(limit);

  res.status(200).json({
    totalTeachers,
    pagination,
    status: "success",
    message: "Teachers fetched successfully",
    result: teachers.length,
    data: teachers,
  });
});

// Get Single Teachers
// Route GET api/teachers/:teacherId/admin
// access = Private
exports.getTeacherByAdmin = asyncHandler(async (req, res) => {
  const teacherId = req.params.teacherId;
  const teacher = await Teacher.findById(teacherId);

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

// Get Teacher Viewing his own profile
// Route GET api/teachers/profile
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
// Route PUT api/teachers/:id/update
// access = Private Teacher Only
exports.teacherUpdateProfile = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error("User not found");
  }
  //Check if the user is updating their password
  if (password) {
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: await hashedPassword(password), name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated successfully",
    });
  } else {
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      { email, name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated successfully",
    });
  }
});

// Admin Update Teacher
// Route PUT api/teachers/:id/admin
// access = Private Admin Only
exports.adminUpdateTeacher = asyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;

  const teacherFound = await Teacher.findById(req.params.teacherId);
  if (!teacherFound) {
    throw new Error("User not found");
  }

  // Check if Teacher is not Withdrawn
  if (teacherFound.isWithdrawn) {
    throw new Error("Action Denied, Teache is withdrawn");
  }

  //Assign program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //Assign Class Level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  // Assign Academic year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //Assign Subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }
});
