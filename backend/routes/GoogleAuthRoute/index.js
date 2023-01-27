const express = require("express");
const authGoogle = express.Router();

authGoogle.use("/google", require("./signinGoogle"), require("./signupGoogle"));

module.exports = authGoogle;
