const asyncHandler = require("express-async-handler");
const ClassLevel = require("../../models/academic/ClassLevel");
const Admin = require("../../models/staff/Admin");

//Create Class Level 
//POST api/v1/class-level
//Private route
exports.createClassLevel  = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Checke if Academic Year exists already
  const classFound = await ClassLevel.findOne({ name });

  if (classFound) {
    throw new Error(`${name} already exists`);
  }

  //Otherwise Create new Academic term
  classCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //Push Academic Year into Admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classCreated._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Class created successfully",
    data: classCreated,
  });
});

//Get all Classes
//GET api/v1/class-levels
//Private route
exports.getAllClassLevels = asyncHandler(async (req, res) => {
  //Checke if Class exists
  const classes = await ClassLevel.find();

  res.status(200).json({
    status: "success",
    message: "Classes fetched successfully",
    data: classes,
  });
});

//Get single class
//GET class-level/:id
//Private route
exports.getSingleClass = asyncHandler(async (req, res) => {
  //Checke if Academic Year exists
  const singleClass = await ClassLevel.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Class Fetched Successfully",
    data: singleClass,
  });
});

//update  Class
//PUT class-level/:id
//Private route
exports.updateClass = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //Check if name exist
  const classFound = await ClassLevel.findOne({ name });

  if (classFound) {
    throw new Error(`${name} already exist`);
  }

  const updatedClass = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    { name, description, createdBy: req.userAuth._id },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Class Updated Successfully",
    data: updatedClass,
  });
});

//DELETE  Class
//DELETE class-level/:id
//Private route
exports.deleteClass = asyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Class Deleted Successfully",
  });
});
