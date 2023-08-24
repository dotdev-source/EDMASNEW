const express = require("express");
const morgan = require("morgan");
const {
  globalErrorHandler,
  notFound,
} = require("../middlewares/globalErrorHandler");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const ClassLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectRouter = require("../routes/academics/subjects");
const yearGroupRouter = require("../routes/academics/yearGroups");
const teacherRouter = require("../routes/staff/teacherRouter");
const examsRouter = require("../routes/academics/examRoute");
const studentRouter = require("../routes/students/studentRouter");
const questionRouter = require("../routes/academics/questionRoute");

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  // console.log('Middleware', req);
  console.log(`${req.method} ${req.originalUrl}`);

  next();
});

//Routes
app.use("/api/v1/admins/", adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", ClassLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups", yearGroupRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/exams", examsRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/questions", questionRouter);

//Error Middleware
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
