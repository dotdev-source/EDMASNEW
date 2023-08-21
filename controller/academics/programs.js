const asyncHandler = require("express-async-handler");
const Program = require("../../models/academic/Program");
const Admin = require("../../models/staff/Admin");

//Create Program
//POST api/v1/Program
//Private route
exports.createProgram = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Checke if  exists already
  const programFound = await Program.find({ name });

  if (programFound) {
    throw new Error(`${name} already exists`);
  }

  //Otherwise Create new Program
  programCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //Push Program into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Program created successfully",
    data: programCreated,
  });
});

//Get all Programs
//GET api/v1/programs
//Private route
exports.getAllPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find();

  res.status(200).json({
    status: "success",
    message: "Program fetched successfully",
    data: programs,
  });
});

//Get single Program
//GET api/v1/programs/:id
//Private route
exports.getProgram = asyncHandler(async (req, res) => {
  //Checke if Program  exists
  const singleProgram = await Program.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Program Fetched Successfully",
    data: singleProgram,
  });
});

//update  Program
//PUT api/v1/programs
//Private route
exports.updateProgram = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Check if Program exist
  const programFound = await Program.findOne({ name });

  if (programFound) {
    throw new Error(`${name} already exist`);
  }

  const updatedProgram = await Program.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Program Updated Successfully",
    data: updatedProgram,
  });
});

//DELETE  Program
//DELETE api/v1/programs
//Private route
exports.deleteProgram = asyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Program Deleted Successfully",
  });
});
