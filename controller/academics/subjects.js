const asyncHandler = require("express-async-handler");
const Subject = require("../../models/academic/Subject");
const ClassLevel = require("../../models/academic/ClassLevel");
const Admin = require("../../models/staff/Admin");

//Create Subject
//POST api/v1/subjects/:classLevelId
//Private route
exports.createSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  //Find class
  const classLevelFound = await ClassLevel.findById(req.params.classLevelID);

  if (!classLevelFound) {
    throw new Error(`class does not exist`);
  }

  //Check if the subject already exists
  const subjectFound = await Subject.findOne({ name });

  if (subjectFound) {
    throw new Error(`${name} already exist`);
  }

  //Otherwise Create new Subject
  subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });

  //Push Program into Class
  classLevelFound.subjects.push(subjectCreated._id);
  await classLevelFound.save();

  res.status(201).json({
    status: "success",
    message: "SubjectCreated created successfully",
    data: subjectCreated,
  });
});

//Get all Subjects
//GET api/v1/subjects
//Private route
exports.getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();

  res.status(200).json({
    status: "success",
    message: "Subject fetched successfully",
    data: subjects,
  });
});

//Get single subjects
//GET api/v1/subjects/:id
//Private route
exports.getProgram = asyncHandler(async (req, res) => {
  //Checke if Program  exists
  const singleSubject = await Subject.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Subject Fetched Successfully",
    data: singleSubject,
  });
});

//update  Subject
//PUT api/v1/subjects/:id
//Private route
exports.updateSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;

  //Check if Program exist
  const subjectFound = await Subject.findOne({ name });

  if (subjectFound) {
    throw new Error(`${name} already exist`);
  }

  const updatedSubject = await Program.findByIdAndUpdate(
    req.params.id,
    { name, description, academicTerm, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Subject Updated Successfully",
    data: updatedSubject,
  });
});

//DELETE  Subject
//DELETE api/v1/subjects/:id
//Private route
exports.deleteSubject = asyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Subject Deleted Successfully",
  });
});
