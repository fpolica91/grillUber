const { check } = require("express-validator");

exports.create = [
  check("email")
    .exists()
    .isEmail(),
  check("password")
    .exists()
    .isAlphanumeric()
    .isLength({ min: 6 })
];
