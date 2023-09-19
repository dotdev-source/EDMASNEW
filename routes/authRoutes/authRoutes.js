const express = require("express");
const router = express.Router();
const authController = require("../../controller/authController/auth");
const loginLimiter = require("../../middlewares/loginLimiter");

const authRoutes = express.Router();

authRoutes.post('/', loginLimiter, authController.login);

authRoutes.route("/refresh").get(authController.refresh);

authRoutes.route("/logout").post(authController.logout);

module.exports = authRoutes;
