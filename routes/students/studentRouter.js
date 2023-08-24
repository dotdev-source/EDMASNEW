const express = require("express");
const {
    adminRegisterStudent,
    studentLogin,
    getStudentProfile,
    getAllStudentByAdmin,
    getStudentByAdmin,
    adminUpdateStudent,
} = require("../../controller/students/studentController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLoggedIn = require("../../middlewares/isStudentLogin");



const studentRouter = express.Router();

studentRouter.post("/admin/register", isLoggedIn, isAdmin, adminRegisterStudent);
studentRouter.post("/login", studentLogin);
studentRouter.get("/profile", isStudentLoggedIn, isStudent, getStudentProfile);
studentRouter.get("/", isLoggedIn, isAdmin, getAllStudentByAdmin);
studentRouter.get("/:studentId/admin", isLoggedIn, isAdmin, getStudentByAdmin);
studentRouter.put("/:studentId/update/admin", isLoggedIn, isAdmin, adminUpdateStudent);



module.exports = studentRouter;
