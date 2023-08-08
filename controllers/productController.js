const Product = require("../models/Product.js");
const fs = require("fs");
const path = require("path");
const imagesDir = path.join(__dirname, "../uploads");

const AllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (!products) {
      return res
        .status(400)
        .json({ msg: "an error occured while fetching all data!" });
    }

    return res.status(200).json({
      msg: "All data fetch successfully!",
      data: products,
    });
    // });
  } catch (error) {
    return res.status(500).json({
      msg: "server error fetching all data: ",
      error: error,
    });
  }
};

const SingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res
        .status(400)
        .json({ msg: "an error occured while fetching data!" });
    }

    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.log("Error reading images directory", err);
        return res.status(500).json({ message: "Server Error" });
      }

      return res
        .status(200)
        .json({ msg: "Data Import Successfully!", data: product });
    });
  } catch (error) {
    return res.json({
      msg: "server error fetching data: ",
      error: error,
    });
  }
};

const StoreProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const filePaths = req.files.map((file) => file.filename);
    console.log("filePaths: 1");
    const {
      product_title,
      product_qty,
      product_tagline,
      product_description,
      product_color_tags,
      product_size_tags,
      product_categories,
      product_price,
      product_discount,
    } = req.body;
    console.log("filePaths: 2");
    if (
      !product_title ||
      !product_tagline ||
      !product_description ||
      !product_categories ||
      !product_price ||
      !product_discount ||
      !product_qty ||
      filePaths.length <= 0
    ) {
      return res
        .status(400)
        .json({ msg: "Please fill all the required Filleds!" });
    }
    console.log("h2");
    const { company_name, company_location } = req.user.userExits;
    console.log("h3");
    const newProduct = new Product({
      product_title,
      product_qty,
      product_tagline,
      product_description,
      product_image: filePaths,
      product_color_tags,
      product_size_tags,
      product_categories,
      product_price,
      product_discount,
      product_company_name: company_name,
      product_company_location: company_location,
    });
    // console.log(newProduct);
    await newProduct.save();
    console.log("filePaths: 4");
    res.status(200).json({ msg: "added Successfully!", data: newProduct });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "error while adding data!", error: error });
  }
};

const UpdateProduct = async (req, res, next) => {
  try {
    console.log("Full body: ", req.body);
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "product not found!" });
    }
    const filePaths = req.files.map((file) => file.filename);
    const { preImages } = req.body;

    let AllImages = [];
    if (preImages && filePaths) {
      AllImages = [...preImages, ...filePaths];
    } else if (filePaths && !preImages) {
      AllImages = [...filePaths];
    } else {
      AllImages = [...preImages];
    }
    console.log(AllImages);
    const {
      product_title,
      product_tagline,
      product_description,
      product_image,
      product_color_tags,
      product_size_tags,
      product_categories,
      product_price,
      product_discount,
      product_company_name,
      product_company_location,
    } = req.body;
    const UpdatedProduct = await Product.findOneAndUpdate(
      { _id: product._id },
      {
        product_title: product_title ? product_title : product.product_title,
        product_tagline: product_tagline
          ? product_tagline
          : product.product_tagline,
        product_description: product_description
          ? product_description
          : product.product_description,
        product_image: AllImages,
        product_color_tags: product_color_tags
          ? product_color_tags
          : product.product_color_tags,
        product_size_tags: product_size_tags
          ? product_size_tags
          : product.product_size_tags,
        product_categories: product_categories
          ? product_categories
          : product.product_categories,
        product_price: product_price ? product_price : product.product_price,
        product_discount: product_discount
          ? product_discount
          : product.product_discount,
        product_company_name,
        product_company_location,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Updated Successfully!", data: UpdatedProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "server error Updating data: ",
      error: error,
    });
  }
};

const DeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "Not able to delete Product!" });
    }

    const deletedProduct = await Product.findOneAndRemove({ _id: product._id });
    await deletedProduct.product_image?.map((data) => {
      console.log(data);
      const imagePath = path.join(imagesDir, data);
      fs.unlink(imagePath, (err, file) => {
        if (err) {
          console.log("err:", err);
        }
      });
    });
    return res
      .status(200)
      .json({ msg: "delete successfully!", data: deletedProduct });
  } catch (error) {
    return res.json({
      msg: "server error deleting data: ",
      error: error,
    });
  }
};

// const SingleImage = async (req, res, next) => {
//   try {
//     const product = await Product.findOne({ _id: req.params.id });

//     if (!product) {
//       return res
//         .status(400)
//         .json({ msg: "an error occured while fetching data!" });
//     }

//     fs.readdir(imagesDir, (err, files) => {
//       if (err) {
//         console.log("Error reading images directory", err);
//         return res.status(500).json({ message: "Server Error" });
//       }
//       const imagePaths = product.product_image.map((file) => `/images/${file}`);
//       product.product_image = imagePaths;
//       return res
//         .status(200)
//         .json({ msg: "Data Import Successfully!", data: product });
//     });
//   } catch (error) {
//     return res.json({
//       msg: "server error fetching data: ",
//       error: error,
//     });
//   }
// };

module.exports = {
  AllProducts,
  SingleProduct,
  StoreProduct,
  UpdateProduct,
  DeleteProduct,
};
