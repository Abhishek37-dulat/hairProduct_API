const express = require("express");
const {
  GetAllCartItem,
  GetAllCartItems,
  AddCartItem,
  DeleteCartItem,
} = require("../controllers/cartController.js");
const authenticate = require("../middleware/authmiddleware.js");
const adminauthenticate = require("../middleware/adminauthmiddleware.js");
const cartRoute = express.Router();

cartRoute.get("/cart", authenticate, GetAllCartItem);
cartRoute.get("/admin/cart", adminauthenticate, GetAllCartItems);
cartRoute.post("/cart", authenticate, AddCartItem);
cartRoute.delete("/cart", authenticate, DeleteCartItem);

module.exports = cartRoute;
