require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {   // ✅ FIX HERE
    expiresIn: 3 * 24 * 60 * 60,
  });
};