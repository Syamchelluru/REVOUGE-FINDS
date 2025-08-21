const { body } = require("express-validator");  // import FIRST

exports.validateSignup = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("mobile")
    .isMobilePhone()
    .withMessage("Enter a valid mobile number"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
