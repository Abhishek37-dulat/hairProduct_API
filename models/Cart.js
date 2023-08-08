const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  total_count: {
    type: Number,
    min: 1,
    max: 10,
    require: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
