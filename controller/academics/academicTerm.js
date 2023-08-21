const asyncHandler = require("express-async-handler");
const AcademicTerm = require("../../models/academic/AcademicTerm");
const Admin = require("../../models/staff/Admin");

//Create academic term
//POST academic-term
//Private route
exports.createAcademicTerm = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //Checke if Academic Year exists already
  const academicTerm = await AcademicTerm.findOne({ name });

  if (academicTerm) {
    throw new Error(`${name} already exists`);
  }

  //Otherwise Create new Academic term
  academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //Push Academic Year into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();


  //RESPONSE
  res.status(201).json({
    status: "success",
    message: "Academic Year created successfully",
    data: academicTermCreated,
  });
});

//Get all academic terms
//GET academic-terms
//Private route
exports.getAllAcademicTerms = asyncHandler(async (req, res) => {
  //Checke if Academic Year exists
  const academicTerms = await AcademicTerm.findOne();

  res.status(200).json({
    status: "success",
    message: "Academic Term fetched successfully",
    data: academicTerms,
  });
});

//Get single academic term
//GET academic-term/:id
//Private route
exports.getSingleAcademicTerm = asyncHandler(async (req, res) => {
  //Checke if Academic Year exists
  const academicTerm = await AcademicTerm.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year fetched successfully",
    data: academicTerm,
  });
});

//update  academic term
//PUT academic-term/:id
//Private route
exports.updateAcademicTerm = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;

  //Check if name exist
  const academicTermFound = await AcademicTerm.findOne({ name });

  if (academicTermFound) {
    throw new Error(`${name} already exist`);
  }

  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    { name, description, duration, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Academic Year updated successfully",
    data: academicTerm,
  });
});

//DELETE  academic term
//DELETE academic-term/:id
//Private route
exports.deleteAcademicTerm = asyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year deleted successfully",
  });
});
