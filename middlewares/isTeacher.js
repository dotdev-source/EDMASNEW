const Teacher = require("../models/staff/Teacher");

const isTeacher = async (req, res, next) => {
    const userid = req?.userAuth?._id;
    const teacherFound = await Teacher.findById(userid);
    if (teacherFound?.role == "teacher") {
        next();
    } else {
        next(new Error('Access denied, Teacher only'));
    }
  
};

module.exports = isTeacher;
