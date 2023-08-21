const verifyToken = require("../utils/verifyToken");
const Admin = require("../models/staff/Admin");

const isLoggedIn = async (req, res, next) => {
  // Get Token From Heder
  const headerObjt = req.headers;
  const token = headerObjt?.authorization?.split(" ")[1];

  //Verify Token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //find the admin
const user = await Admin.findById(verifiedToken.id).select('name email role')
    //Save the User into Request object
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired or Invalid");
    next(err);
  }
};

module.exports = isLoggedIn;
