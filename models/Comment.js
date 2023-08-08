const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  product_feedback: {
    comment: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
    },
    image: [
      {
        type: String,
      },
    ],
  },
});

const Comment = mongoose.model("Comment", feedbackSchema);
module.exports = Comment;
