const Student = require("../models/academic/Student");

const isStudent = async (req, res, next) => {
    const userid = req?.userAuth?._id;
    const studentFound = await Student.findById(userid);
    if (studentFound?.role === "student") {
        next();
    } else {
        next(new Error('Access denied, Student only'));
    }
  
};

module.exports = isStudent;
