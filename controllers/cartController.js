const Cart = require("../models/Cart.js");

const GetAllCartItems = async (req, res, next) => {
  try {
    const allcart = await Cart.find({});
    if (!allcart) {
      return res.status(400).json({ msg: "error to all cart item!" });
    }
    return res
      .status(200)
      .json({ msg: "Success to all cart item!", data: allcart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error get all Save Item!", error: error });
  }
};

const GetAllCartItem = async (req, res, next) => {
  try {
    const allcart = await Cart.find({ userID: req.user.userExits._id });
    if (!allcart) {
      return res
        .status(400)
        .json({ msg: "error to all cart item!", data: allcart });
    }
    return res
      .status(200)
      .json({ msg: "Success to all save item!", data: allcart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error get all Save Item!", error: error });
  }
};

const AddCartItem = async (req, res, next) => {
  try {
    const { userID, product_id, total_count } = req.body;
    if (!userID || !product_id || !total_count) {
      return res.status(400).json({ msg: "all filled required" });
    }
    const addCart = await new Cart({
      userID: userID,
      product_id: product_id,
      total_count: total_count,
    });
    await addCart.save();
    return res.status(200).json({ msg: "added successfully!", data: addCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error add one Cart Item!", error: error });
  }
};

const DeleteCartItem = async (req, res, next) => {
  try {
    const allCart = await Cart.findOne({ _id: req.body.id });
    if (!allCart) {
      return res.status(400).json({ msg: "doesn't exist Cart item!" });
    }
    if (req.user.userExits._id != allsave.userID) {
      return res.status(400).json({ msg: "permission denied item!" });
    }

    await Cart.findOneAndRemove({ _id: allCart._id });
    return res
      .status(200)
      .json({ msg: "Success to Delete Cart item!", data: allCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error delete Cart Item!", error: error });
  }
};

module.exports = {
  GetAllCartItems,
  GetAllCartItem,
  AddCartItem,
  DeleteCartItem,
};
