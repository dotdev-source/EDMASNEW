const Admin = require("../models/staff/Admin");

const isAdmin = async (req, res, next) => {
    const userid = req?.userAuth?._id;
    const adminFound = await Admin.findById(userid);
    if (adminFound?.role == "admin") {
        next();
    } else {
        next(new Error('Access denied, admins only'));
    }
  
};

module.exports = isAdmin;
