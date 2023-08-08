const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  product_title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  product_qty: {
    type: Number,
    required: true,
  },
  product_tagline: {
    type: String,
    minLength: 2,
    maxLength: 200,
    required: true,
  },
  product_description: {
    type: String,
    minLength: 20,
    maxLength: 1000,
    required: true,
  },
  product_image: [
    {
      type: String,
      required: true,
    },
  ],
  product_color_tags: {
    type: [],
  },

  product_size_tags: [
    {
      size: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
  ],
  product_categories: {
    type: [],
    required: true,
  },
  product_price: {
    type: Number,
    min: 1,
    required: true,
  },
  product_discount: {
    type: Number,
    min: 0,
    max: 99,
  },
  product_company_name: {
    type: String,
  },
  product_company_location: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
