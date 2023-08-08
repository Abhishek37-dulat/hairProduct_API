const express = require("express");
const {
  AddComment,
  ShowComment,
  DeleteComment,
  UpdateComment,
  UserComment,
} = require("../controllers/commentController.js");
const authenticate = require("../middleware/authmiddleware.js");
const adminauthenticate = require("../middleware/adminauthmiddleware.js");

commentRoute = express.Router();

commentRoute.get("/comments", authenticate, ShowComment);
commentRoute.get("/comments/user", authenticate, UserComment);
commentRoute.post("/comment", authenticate, AddComment);
commentRoute.put("/comment/:id", authenticate, UpdateComment);
commentRoute.delete("/comment/:id", authenticate, DeleteComment);
commentRoute.get("/admin/comments", adminauthenticate, ShowComment);

module.exports = commentRoute;
