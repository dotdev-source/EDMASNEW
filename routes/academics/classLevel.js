const express = require("express");
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClass,
  updateClass,
  deleteClass,
} = require("../../controller/academics/classLevel");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const ClassLevelRouter = express.Router();

ClassLevelRouter.post("/", isLoggedIn, isAdmin, createClassLevel);
ClassLevelRouter.get("/", isLoggedIn, isAdmin, getAllClassLevels);
ClassLevelRouter.get("/:id", isLoggedIn, isAdmin, getSingleClass);
ClassLevelRouter.put("/:id", isLoggedIn, isAdmin, updateClass);
ClassLevelRouter.delete("/:id", isLoggedIn, isAdmin, deleteClass);

module.exports = ClassLevelRouter;
