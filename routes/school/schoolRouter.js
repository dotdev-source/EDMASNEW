const express = require("express");
const app = require("../../app/app");
const {createSchool} = require("../../controller/school/SchoolControllers");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

const schoolRouter = express.Router();

//Create School
schoolRouter.post("admin/register", createSchool);

// //Admin Login
// adminRouter.post("/login", adminLogin);

// //Get All Admin
// adminRouter.get("/", isLoggedIn, allAdmins);

// //Get Single Admin
// adminRouter.get("/profile", isLoggedIn, isAdmin, getAdminProfileCtrl);

// // Update Admin
// adminRouter.put("/", isLoggedIn, updateAdmin);

// //Delete Admin
// adminRouter.delete("/:id", isLoggedIn, deleteAdmin);

// //Admin suspending a teacher
// adminRouter.put("/suspend/teacher/:id", suspendTeacher);

// //Admin unsuspending a teacher
// adminRouter.put("/unsuspend/teacher/:id", unsuspendTeacher);

// //Admin withdrawing a teacher
// adminRouter.put("/withdraw/teacher/:id", withdrawTeacher);

// //Admin unwithdrawing a teacher
// adminRouter.put("/unwithdraw/teacher/:id", unwithdrawTeacher);

// //Admin publishing examination result
// adminRouter.post("/publish/exams", publishExams);

// //Admin unpublishing examination result
// adminRouter.put("/unpublish/exams", unpublishExams);

module.exports = schoolRouter;
