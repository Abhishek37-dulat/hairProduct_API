const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  product_title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    require: true,
  },
  product_tagline: {
    type: String,
    minLength: 2,
    maxLength: 200,
    require: true,
  },
  product_description: {
    type: String,
    minLength: 20,
    maxLength: 1000,
    require: true,
  },
  product_image: {
    type: String,
    require: true,
  },
  product_color_categories: {
    type: String,
    product_color_categories_images: {
      type: String,
    },
  },

  product_size_categories: {
    type: String,
  },
  product_: {
    type: String,
    minLength: 2,
    maxLength: 100,
    require: true,
  },
  product_name: {
    type: String,
    minLength: 2,
    maxLength: 100,
    require: true,
  },
});
