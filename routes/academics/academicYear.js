const express = require("express");
const {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYears,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academics/academicYear");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const academicYearRouter = express.Router();

academicYearRouter.post("/", isLoggedIn, isAdmin, createAcademicYear);
academicYearRouter.get("/", isLoggedIn, isAdmin, getAllAcademicYears);
academicYearRouter.get("/:id", isLoggedIn, isAdmin, getSingleAcademicYears);
academicYearRouter.put("/:id", isLoggedIn, isAdmin, updateAcademicYear);
academicYearRouter.delete("/:id", isLoggedIn, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
