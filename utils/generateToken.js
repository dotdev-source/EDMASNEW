const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "90d" });
};

const refreshToken = (id) => {
  return jwt.sign({ id }, "anykey", { expiresIn: "90d" });
};

module.exports = {generateToken, refreshToken};