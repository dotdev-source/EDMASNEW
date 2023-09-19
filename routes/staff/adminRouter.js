const express = require("express");
const app = require("../../app/app");
const {
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
} = require("../../controller/staff/adminController");
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require("../../middlewares/isAdmin");
const loginLimiter = require("../../middlewares/loginLimiter");
const verifyJWT = require("../../middlewares/verufyJWT");


const adminRouter = express.Router();

//Register Admin
adminRouter.post("/register", registerAdmin);

//Admin Login
adminRouter.post("/login", loginLimiter, adminLogin);

//Refrestoken
adminRouter.get("/refresh", refresh);

adminRouter.post("/logout", adminLogout);

adminRouter.use(verifyJWT);

//Get All Admin
adminRouter.get("/", isLoggedIn, allAdmins);

//Get Single Admin
adminRouter.get("/profile", isLoggedIn, isAdmin, getAdminProfileCtrl);

// Update Admin
adminRouter.put("/", isLoggedIn, updateAdmin);

//Delete Admin
adminRouter.delete("/:id", isLoggedIn, deleteAdmin);

//Admin suspending a teacher
adminRouter.put("/suspend/teacher/:id", suspendTeacher);

//Admin unsuspending a teacher
adminRouter.put("/unsuspend/teacher/:id", unsuspendTeacher);

//Admin withdrawing a teacher
adminRouter.put("/withdraw/teacher/:id", withdrawTeacher);

//Admin unwithdrawing a teacher
adminRouter.put("/unwithdraw/teacher/:id", unwithdrawTeacher);

//Admin publishing examination result
adminRouter.post("/publish/exams", publishExams);

//Admin unpublishing examination result
adminRouter.put("/unpublish/exams", unpublishExams);

module.exports = adminRouter;
