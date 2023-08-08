// GetAllOrders,
//   GetSingleOrder,
//   NewOrder,
//   UpdateOrder,
const axios = require("axios");
const dotenv = require("dotenv").config();

const verifyOrders = async (req, res, next) => {
  try {
    const data = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.ADMIN_SHOPROCKET_EMAIL_ID,
        password: process.env.ADMIN_SHOPROCKET_PASSWORD,
      }
    );
    console.log(data);
    return res.status(200).json({ data: data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server side error", error: error });
  }
};

const GetAllOrders = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://apiv2.shiprocket.in/v1/external/orders",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await axios(config);

    res.status(200).json({ data: data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Side error while Getting all Orders",
      error: error,
    });
  }
};

const NewOrder = async (req, res, next) => {
  try {
    const {
      order_id,
      order_date,
      pickup_location,
      channel_id,
      comment,
      billing_customer_name,
      billing_last_name,
      billing_address,
      billing_address_2,
      billing_city,
      billing_pincode,
      billing_state,
      billing_country,
      billing_email,
      billing_phone,
      shipping_is_billing,
      shipping_customer_name,
      shipping_last_name,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_pincode,
      shipping_country,
      shipping_state,
      shipping_email,
      shipping_phone,
      order_items,
      payment_method,
      shipping_charges,
      giftwrap_charges,
      transaction_charges,
      total_discount,
      sub_total,
      length,
      breadth,
      height,
      weight,
    } = req.body;
    //   const token = await req.headers.authorization.split(" ")[1];
    //   var config = {
    //     method: "post",
    //     maxBodyLength: Infinity,
    //     url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     data:
    //   };
    //   const data = await axios(config);

    //   res.status(200).json({ data: data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Side error while Getting all Orders",
      error: error,
    });
  }
};

module.exports = { verifyOrders, GetAllOrders, NewOrder };
