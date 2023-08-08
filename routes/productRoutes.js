const express = require("express");
const {
  AllProducts,
  SingleProduct,
  StoreProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/productController.js");
const authenticate = require("../middleware/authmiddleware.js");
const adminauthenticate = require("../middleware/adminauthmiddleware.js");
const { upload } = require("../middleware/imagemiddleware.js");
const uploads = require("multer")();

productRoute = express.Router();

productRoute.get("/products", authenticate, AllProducts);
productRoute.get("/products/:id", authenticate, SingleProduct);
productRoute.get("/admin/products", adminauthenticate, AllProducts);
productRoute.get("/admin/products/:id", adminauthenticate, SingleProduct);
productRoute.post(
  "/admin/products",
  upload.array("product_image", 5),
  adminauthenticate,
  StoreProduct
);
// upload.array("images", 5),
productRoute.put(
  "/admin/products/:id",
  upload.array("product_image", 5),
  adminauthenticate,
  UpdateProduct
);
productRoute.delete(
  "/admin/products/:id",
  upload.array("product_image", 5),
  adminauthenticate,
  DeleteProduct
);

module.exports = productRoute;
