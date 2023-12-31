const asyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const generateToken = require("../../utils/generateToken");
// const verifyToken = require("../../utils/verifyToken");
// const {
//   passwordHashed,
//   isPasswordMatched,
//   hashedPassword,
// } = require("../../utils/helpers");

// Register Admin
// Route POST api/admins/register
// access = Private
const registerAdmin = asyncHandler(async (req, res) => {
  const { fullname, email, password, phoneNumber } = req.body;

  //check if Admin exist
  const adminExist = await Admin.findOne({ email }).collation({locale: 'en', strength: 2}).lean().exec(); 
  if (adminExist) {
    throw new Error("Admin Exist");
  }

  //Register Admin
  const user = await Admin.create({
    fullname,
    email,
    phoneNumber,
    password: await hashedPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,

    message: "Admin created successfully",
  });
});

// Admin Login
// Route POST api/admins/login
// access = public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await Admin.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        role: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "5d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 5 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });

  // //Find the user
  // const user = await Admin.findOne({ email });
  // if (!user) {
  //   return res.json({ message: "Invalid Credentials" });
  // }

  // // Verified password
  // const isMatched = await isPasswordMatched(password, user.password);

  // if (!isMatched) {
  //   return res.json({ message: "Invalid Credentials" });
  // } else {
  //   return res.json({
  //     data: generateToken(user._id),
  //     message: "Admin logged in successfully",
  //   });
  // }
});

// @desc Refresh
// @route GET /admin/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await Admin.findOne({ email: decoded.email }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.email,
            roles: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
});

// @desc Logout
// @route POST /admin/logout
// @access Public - just to clear cookie if exists
const adminLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

// Get All Admin
// Route GET api/admins/
// access = Private
const allAdmins = asyncHandler(async (req, res) => {});

// Get Single Admin
// Route GET api/admins/:id
// access = Private
const getAdminProfileCtrl = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password")
    .populate("academicYears");
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Profile fetched succcessfully",
    });
  }
});

// Update Admin
// Route Put api/admins/:id
// access = Private
const updateAdmin = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("User not found");
  }

  //Check if the user is updating their password
  if (password) {
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      { email, password: await hashedPassword(password), name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      { email, name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

// Delete Admin
// Route DELETE api/admins/:id
// access = Private
const deleteAdmin = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "admin is deleted",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Suspending a teacher
// Route PUT api/admins/suspend/teacher/:id
// access = Private
const suspendTeacher = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        message: "Admin suspends teacher",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Unuspending a teacher
// Route PUT api/admins/unsuspend/teacehr/:id
// access = Private
const unsuspendTeacher = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "Admin unsuspends teacher",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Withdraw a teacher
// Route PUT api/admins/withdraw/teacher/:id
// access = Private
const withdrawTeacher = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "Admin withdraws a teacher",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Unwithdraw a teacher
// Route PUT api/admins/unwitdraw/teacher/:id
// access = Private
const unwithdrawTeacher = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "Admin unwithdraws a teacher",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Publish Exams
// Route POST api/admins/publish/exams
// access = Private
const publishExams = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "Exam result published successfully",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

// Unpublish Exams
// Route PUT api/admins/unpublish/exams
// access = Private
const unpublishExams = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: {
        message: "Exam result unpublished successfully",
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  adminLogin,
  refresh,
  adminLogout,
  allAdmins,
  getAdminProfileCtrl,
  updateAdmin,
  deleteAdmin,
  suspendTeacher,
  unsuspendTeacher,
  withdrawTeacher,
  unwithdrawTeacher,
  publishExams,
  unpublishExams,
};
