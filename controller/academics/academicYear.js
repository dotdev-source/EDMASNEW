const asyncHandler = require("express-async-handler");
const AcademicYear = require("../../models/academic/AcademicYear");
const Admin = require("../../models/staff/Admin");

//Create academic year
//POST academic-years
//Private route
exports.createAcademicYear = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear, isCurrent, createdBy } = req.body;

  //Checke if Academic Year exists already
  const academicYear = await AcademicYear.findOne({ name });

  if (academicYear) {
    throw new Error(`${name} already exists`);
  }

  //Otherwise Create new Academic Year
  academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    isCurrent,
    createdBy: req.userAuth._id,
  });
    
    //Push Academic Year into Admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();

  res.status(201).json({
    status: "success",
    message: "Academic Year created successfully",
    data: academicYearCreated,
  });
});

//Get all academic year
//GET academic-years
//Private route
exports.getAllAcademicYears = asyncHandler(async (req, res) => {
  //Checke if Academic Year exists
  const getAcademicYears = await AcademicYear.findOne();

  res.status(200).json({
    status: "success",
    message: "Academic Years fetched successfully",
    data: getAcademicYears,
  });
});

//Get single academic year
//GET academic-years/:id
//Private route
exports.getSingleAcademicYears = asyncHandler(async (req, res) => {
  //Checke if Academic Year exists
  const getAcademicYear = await AcademicYear.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year fetched successfully",
    data: getAcademicYear,
  });
});

//update  academic year
//PUT academic-years/:id
//Private route
exports.updateAcademicYear = asyncHandler(async (req, res) => {
    const { name, fromYear, toYear, isCurrent, createdBy } = req.body;
    
    //Check if name exist
    const academicYearFound = await AcademicYear.findOne({ name })
    
    if(academicYearFound) { throw new Error (`${name} already exist`)}

  const getAcademicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    { name, fromYear, toYear, isCurrent, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Academic Year updated successfully",
    data: getAcademicYear,
  });
});


//DELETE  academic year
//DELETE academic-years/:id
//Private route
exports.deleteAcademicYear = asyncHandler(async (req, res) => {

 await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic Year deleted successfully",
  });
});

