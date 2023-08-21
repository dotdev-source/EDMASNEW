const asyncHandler = require("express-async-handler");
const YearGroup = require("../../models/academic/YearGroup");
const Admin = require("../../models/staff/Admin");

//Create Year Group
//POST api/v1/year-groups
//Private route
exports.createYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  //Check if the Year Group already exists
  const yearGroupFound = await YearGroup.findOne({ name });

  if (yearGroupFound) {
    throw new Error(`${name} already exist`);
  }

  //Otherwise Create new Subject
  yearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

    //find Admin
    const admin = await Admin.findById(req.userAuth._id);
    if (!admin) {
        throw new Error(`Admin does not exist`);
    }
// Push year group into Admin
    admin.yearGroups.push(yearGroupCreated._id)
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Year Group created successfully",
    data: yearGroupCreated,
  });
});

//Get All Year Groups
//GET api/v1/year-group
//Private route
exports.getAllYearGroups = asyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();

  res.status(200).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: yearGroups,
  });
});

//Get Single Year Group
//GET api/v1/year-groups/:id
//Private route
exports.getSingleYearGroup = asyncHandler(async (req, res) => {
  //Checke if Program  exists
  const singleYearGroup = await YearGroup.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Year Group Fetched Successfully",
    data: singleYearGroup,
  });
});

//Edit Year Group
//PUT api/v1/year-groups/:id
//Private route
exports.updateYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear  } = req.body;

  //Check if Program exist
  const yearGroupFound = await YearGroup.findOne({ name });

  if (yearGroupFound) {
    throw new Error(`${name} does not exist`);
  }

  const updatedYearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    { name, academicYear, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Year Group Updated Successfully",
    data: updatedYearGroup,
  });
});

//DELETE Year Group
//DELETE api/v1/year-groups/:id
//Private route
exports.deleteYeaGroup = asyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Year Group Deleted Successfully",
  });
});
