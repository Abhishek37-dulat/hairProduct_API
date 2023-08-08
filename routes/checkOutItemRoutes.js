const express = require("express");
const {
  GetUserOrders,
  GetUserSingleOrder,
  NewOrder,
  UpdateOrder,
} = require("../controllers/userOrderController.js");
const authenticate = require("../middleware/authmiddleware.js");

const UserCheckOutRoute = express.Router();

UserCheckOutRoute.get("/", authenticate, GetUserOrders);
UserCheckOutRoute.get("/:id", authenticate, GetUserSingleOrder);
UserCheckOutRoute.post("/", authenticate, NewOrder);
UserCheckOutRoute.put("/:id", authenticate, UpdateOrder);

module.exports = UserCheckOutRoute;
