const express = require("express");
const {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroup,
  deleteYeaGroup,
} = require("../../controller/academics/yearGroups");
const isAdmin = require("../../middlewares/isAdmin");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const yearGroupRouter = express.Router();

yearGroupRouter.post("/", isLoggedIn, isAdmin, createYearGroup);
yearGroupRouter.get("/", isLoggedIn, isAdmin, getAllYearGroups);
yearGroupRouter.get("/:id", isLoggedIn, isAdmin, getSingleYearGroup);
yearGroupRouter.put("/:id", isLoggedIn, isAdmin, updateYearGroup);
yearGroupRouter.delete("/:id", isLoggedIn, isAdmin, deleteYeaGroup);

module.exports = yearGroupRouter;
