const express = require("express");
const {
  userRegister,
  userLogin,
  refreshToken,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/refresh-token", refreshToken);

module.exports = userRoute;
