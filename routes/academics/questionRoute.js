const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
} = require("../../controller/academics/question");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLoggedIn = require("../../middlewares/isTeacherLoggedIn");

const questionRouter = express.Router();

questionRouter.post("/:examsID", isTeacherLoggedIn, isTeacher, createQuestion);
questionRouter.get("/", isTeacherLoggedIn, isTeacher, getAllQuestions);
questionRouter.get("/:ID", isTeacherLoggedIn, isTeacher, getSingleQuestion);
questionRouter.put("/:ID", isTeacherLoggedIn, isTeacher, updateQuestion);

module.exports = questionRouter;
