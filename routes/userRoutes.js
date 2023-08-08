const express = require("express");
const {
  userRegister,
  userLogin,
  refreshToken,
} = require("../controllers/userController.js");

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/refresh-token", refreshToken);

module.exports = userRoute;
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Abhishek37-dulat/hairProduct_API.git
// git push -u origin main
