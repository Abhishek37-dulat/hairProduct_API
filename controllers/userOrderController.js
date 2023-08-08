const CheckOut = require("../models/CheckOutItems");

const GetUserOrders = async (req, res, next) => {
  try {
    const data = await CheckOut.find({ user_id: req.user.userExits._id });
    if (!data) {
      return res.status(400).json({ msg: "no Order Exits!" });
    }
    return res
      .status(200)
      .json({ msg: "Success to all user Orders!", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error get all user Orders!", error: error });
  }
};
const GetUserSingleOrder = async (req, res, next) => {
  try {
    const data = await CheckOut.find({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({ msg: "no Order Exits!" });
    }
    return res.status(200).json({ msg: "Success to user Orders!", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error get user Orders!", error: error });
  }
};
const NewOrder = async (req, res, next) => {
  try {
    const {
      items,
      total_discount,
      delivery_charge,
      order_status,
      total_amount,
    } = req.body;
    if (
      !items ||
      !total_discount ||
      !delivery_charge ||
      !order_status ||
      !total_amount
    ) {
      return res.status(400).json({ msg: "all field are required Order !" });
    }
    const data = await new CheckOut({
      items: items,
      user_id: req.user.userExits._id,
      total_discount: total_discount,
      delivery_charge: delivery_charge,
      order_status: order_status,
      total_amount: total_amount,
    });
    await data.save();
    return res
      .status(200)
      .json({ msg: "Success to add user Orders!", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error add user Orders!", error: error });
  }
};
const UpdateOrder = async (req, res, next) => {
  try {
    const orderdata = await CheckOut.find({ _id: req.params.id });

    if (!orderdata) {
      return res.status(400).json({ msg: "Order doesn't exits !" });
    }
    const { order_status } = req.body;
    if (!order_status) {
      return res.status(400).json({ msg: "Order Status required !" });
    }
    const data = await CheckOut.findByIdAndUpdate(
      { _id: orderdata._id },
      {
        items: orderdata.data.items,
        user_id: req.user.userExits._id,
        total_discount: orderdata.data.total_discount,
        delivery_charge: orderdata.data.delivery_charge,
        order_status: order_status,
        total_amount: orderdata.data.total_amount,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Success to update user Orders!", data: data });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error update user Orders!", error: error });
  }
};

module.exports = {
  GetUserOrders,
  GetUserSingleOrder,
  NewOrder,
  UpdateOrder,
};
