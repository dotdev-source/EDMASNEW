const asyncHandler = require("express-async-handler");
const School = require("../../models/school/School");
const Admin = require("../../models/staff/Admin");

// Register School
// Route POST api/schools/register
// access = Private
const registerSchool = asyncHandler(async (req, res) => {
  const { schoolName, schoolType, regNo, schoolAddress } = req.body;

  //check if School exist
  const schoolExist = await School.findOne({ email });
  if (schoolExist) {
    throw new Error("School Already Exist");
  }

  //Register School
  const schoolCreated = await School.create({
    schoolName,
    schoolType,
    regNo,
    schoolAddress,
  });

   //Push Academic Year into Admin
   const admin = await Admin.findById(req.userAuth._id);
   admin.schools.push(schoolCreated._id);
  await admin.save();
  
  res.status(201).json({
    status: "success",
    data: schoolCreated,
    message: "School created successfully",
  });
});



// Get All School
// Route GET api/schools/
// access = Private
const allSchools = asyncHandler(async (req, res) => {
  const schools = await School.find()

    res.status(200).json({
        status: 'success',
        data: schools,
        message: 'Schools fetched successfully'
    })
});

// Get Single School
// Route GET api/schools/:id
// access = Private
const getSchoolProfileCtrl = asyncHandler(async (req, res) => {
  const school = await School.findById(req.userAuth._id)
    .select("-password")
    .populate("academicYears");
  if (!school) {
    throw new Error("School not found");
  } else {
    res.status(200).json({
      status: "success",
      data: school,
      message: "School Profile fetched succcessfully",
    });
  }
});

// Update School
// Route Put api/schools/:id
// access = Private
const updateSchool = asyncHandler(async (req, res) => {
  const { schoolName, schoolType, regNo, schoolAddress } = req.body;

  const schoolNameExist = await School.findOne({ schoolNameExist });
  if (emailExist) {
    throw new Error("School not found");
  }
    const school = await School.findByIdAndUpdate(
      req.userAuth._id,
      { schoolName, schoolType, regNo, schoolAddress },
    );
    res.status(200).json({
      status: "success",
      data: school,
      message: "School updated successfully",
    });
  }
);

// Delete School
// Route DELETE api/schools/:id
// access = Private



module.exports = {
  registerSchool,
  allSchools,
  getSchoolProfileCtrl,
  updateSchool,
  deleteSchool,
};
