const express = require("express");
const {
  adminRegisterTeacher,
  teachersLogin,
  getAllTeachers,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teachersControllers");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLoggedIn = require("../../middlewares/isTeacherLoggedIn");
const isTeacher = require("../../middlewares/isTeacher");

const teacherRouter = express.Router();

teacherRouter.post(
  "/admin/register",
  isLoggedIn,
  isAdmin,
  adminRegisterTeacher
);
teacherRouter.post("/login", teachersLogin);
teacherRouter.get("/admin", getAllTeachers);
teacherRouter.get("/profile", isTeacherLoggedIn, isTeacher, getTeacherProfile);
teacherRouter.get("/:teacherId/admin", isLoggedIn, isAdmin, getTeacherByAdmin);
teacherRouter.put(
  "/:teacherId/update",
  isTeacherLoggedIn,
  isTeacher,
  teacherUpdateProfile
);
teacherRouter.put(
  "/:teacherId/update/admin",
  isLoggedIn,
  isAdmin,
  adminUpdateTeacher
);

module.exports = teacherRouter;
