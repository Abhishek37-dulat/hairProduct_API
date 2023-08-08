const mongoose = require("mongoose");

const checkOutSchema = mongoose.Schema(
  {
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          require: true,
        },
        qty: {
          type: Number,
          require: true,
        },
      },
    ],

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    total_discount: {
      type: Number,
    },
    delivery_charge: {
      type: Number,
    },
    Order_status: {
      type: String,
    },
    total_amount: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const CheckOut = mongoose.model("CheckOut", checkOutSchema);

module.exports = CheckOut;
