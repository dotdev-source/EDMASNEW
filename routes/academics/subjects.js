const express = require("express");
const {
    createSubject,
    getAllSubjects,
    getProgram,
    updateSubject,
    deleteSubject,
} = require("../../controller/academics/subjects");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const subjectRouter = express.Router();

subjectRouter.post("/:classLevelID", isLoggedIn, isAdmin, createSubject);
subjectRouter.get("/", isLoggedIn, isAdmin, getAllSubjects);
subjectRouter.get("/:id", isLoggedIn, isAdmin, getProgram);
subjectRouter.put("/:id", isLoggedIn, isAdmin, updateSubject);
subjectRouter.delete("/:id", isLoggedIn, isAdmin, deleteSubject);

module.exports = subjectRouter;
