const express = require("express");
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controller/academics/academicTerm");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const academicTermRouter = express.Router();

academicTermRouter.post("/", isLoggedIn, isAdmin, createAcademicTerm);
academicTermRouter.get("/", isLoggedIn, isAdmin, getAllAcademicTerms);
academicTermRouter.get("/:id", isLoggedIn, isAdmin, getSingleAcademicTerm);
academicTermRouter.put("/:id", isLoggedIn, isAdmin, updateAcademicTerm);
academicTermRouter.delete("/:id", isLoggedIn, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
