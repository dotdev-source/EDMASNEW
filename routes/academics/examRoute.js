const express = require("express");
const {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
} = require("../../controller/academics/examsController");

const isTeacherLoggedIn = require("../../middlewares/isTeacherLoggedIn");
const isTeacher = require("../../middlewares/isTeacher");

const examsRouter = express.Router();

examsRouter.post("/", isTeacherLoggedIn, isTeacher, createExam);
examsRouter.get("/", isTeacherLoggedIn, isTeacher, getAllExams);
examsRouter.get("/:id", isTeacherLoggedIn, isTeacher, getSingleExam);
examsRouter.put("/:id", isTeacherLoggedIn, isTeacher, updateExam);

module.exports = examsRouter;
