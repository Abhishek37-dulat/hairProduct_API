const express = require("express");
const {
  GetAllOrders,
  //   GetSingleOrder,
  //   NewOrder,
  //   UpdateOrder,
  verifyOrders,
} = require("../controllers/orderController.js");
// const adminauthenticate = require("../middleware/adminauthmiddleware.js");
const orderRoute = express.Router();

orderRoute.post("/order/varify", verifyOrders);
orderRoute.get("/oders", GetAllOrders);
// orderRoute.get("/order/:id", adminauthenticate, GetSingleOrder);
// orderRoute.post("/order", adminauthenticate, NewOrder);
// orderRoute.put("/order/:id", adminauthenticate, UpdateOrder);

module.exports = orderRoute;
