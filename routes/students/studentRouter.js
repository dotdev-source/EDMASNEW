const express = require("express");
const {
    adminRegisterStudent,
    studentLogin
} = require("../../controller/students/studentController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLoggedIn, isAdmin, adminRegisterStudent);
studentRouter.post("/login", studentLogin);



module.exports = studentRouter;
