const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authController = require("../controllers/authController");

const router = express.Router();

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  mail: Joi.string().email().required(),
});
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
module.exports = router;
