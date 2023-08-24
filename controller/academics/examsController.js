const asyncHandler = require("express-async-handler");
const Exams = require("../../models/academic/Exam");
const Teacher = require("../../models/staff/Teacher");

// Create Exam
// Route POST api/v1/teachers/Exam
// access = Private Teachers only
exports.createExam = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    questions,
    classLevel,
    createdBy,
    academicTerm,
    academicYear,
  } = req.body;

  //Find Teacher
  const teacherFound = await Teacher.findById(req?.userAuth._id);

  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  //If exam Exist
  const examExists = await Exams.findOne({ name });
  if (examExists) {
    throw new Error("Exams already exists");
  }

  const examCreated = new Exams({
    name,
    description,
    subject,
    program,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    questions,
    classLevel,
    createdBy,
    academicTerm,
    academicYear,
    createdBy: req.userAuth?._id,
  });

  //Push the Exam into the Teacher
  teacherFound.examsCreated.push(examCreated._id);

  //Save Exams
  await examCreated.save();
  await teacherFound.save();

  res.status(200).json({
    status: "success",
    message: "Exams created successfully",
    data: examCreated,
  });
});

//Get all Exams
//GET api/v1/exams
//Private route
exports.getAllExams = asyncHandler(async (req, res) => {
  const exams = await Exams.find().populate({
    path: 'questions',
    populate: {
      path: 'createdBy'
    }
  });

  res.status(200).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});

//Get single Exams
//GET api/v1/exams/:id
//Private route
exports.getSingleExam = asyncHandler(async (req, res) => {
  //Checke if Program  exists
  const singleExams = await Exams.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Exam Fetched Successfully",
    data: singleExams,
  });
});

//update  Exams
//PUT api/v1/exams/:id
//Private route
exports.updateExam = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    duration,
    examDate,
    examTime,
    examType,
    examStatus,
    questions,
    classLevel,
    createdBy,
    academicTerm,
    academicYear,
  } = req.body;

  //Check if Exam exist
  const examFound = await Exams.findOne({ name });

  if (examFound) {
    throw new Error(`${name} already exist`);
  }

  const updatedExam = await Exams.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      duration,
      examDate,
      examTime,
      examType,
      examStatus,
      questions,
      classLevel,
      createdBy,
      academicTerm,
      academicYear,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Exams Updated Successfully",
    data: updatedExam,
  });
});
