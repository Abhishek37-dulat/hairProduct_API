const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const adminRegister = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      confirm_password,
      zip_code,
      company_name,
      company_location,
      company_logo,
      company_registration_number,
      company_type,
      company_since,
      total_outlets,
      headquater_location,
      country,
      state,
      city,
      number_of_employee,
    } = req.body;
    const userExits = await Admin.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (userExits) {
      return res.status(400).json({ msg: "User already Exists!" });
    }
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !password ||
      !confirm_password ||
      !zip_code ||
      !company_name ||
      !company_location ||
      !company_registration_number ||
      !company_type ||
      !company_since ||
      !total_outlets ||
      !headquater_location ||
      !country ||
      !state ||
      !city ||
      !number_of_employee
    ) {
      console.log(
        first_name,
        last_name,
        email,
        phone,
        password,
        confirm_password,
        zip_code,
        company_name,
        company_location,
        company_logo,
        company_registration_number,
        company_type,
        company_since,
        total_outlets,
        headquater_location,
        country,
        state,
        city,
        number_of_employee
      );
      return res.status(400).json({ msg: "all fields are required!" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ msg: "password and confirm must match!" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const createData = await new Admin({
      first_name,
      last_name,
      email,
      phone,
      zip_code,
      password: hashedpassword,
      company_name,
      company_location,
      company_logo,
      company_registration_number,
      company_type,
      company_since,
      total_outlets,
      headquater_location,
      country,
      state,
      city,
      number_of_employee,
    });
    await createData.save();
    return res
      .status(200)
      .json({ msg: "admin created successfully", data: createData });
  } catch (error) {
    res.status(500).json({
      msg: "not able to register internal server error!",
      error: error,
    });
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userExits = await Admin.findOne({
      $or: [{ email: username }, { phone: username }],
    });
    if (!username || !password) {
      return res.status(400).json({ msg: "all fields are required!" });
    }
    if (!userExits) {
      return res
        .status(400)
        .json({ msg: "username or password doesn't match!" });
    }
    const passwordCheck = bcrypt.compare(password, userExits.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ msg: "username or password doesn't match" });
    }
    let token = jwt.sign(
      { first_name: userExits.first_name },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: "5h" }
    );
    let refreshtoken = jwt.sign(
      { first_name: userExits.first_name },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "48h" }
    );
    return res.status(200).json({
      msg: "Login successfully",
      token: token,
      refreshtoken: refreshtoken,
    });
  } catch (error) {
    res.status(500).json({
      msg: "not able to Login internal server error!",
      error: error,
    });
  }
};

const refreshToken = (req, res, next) => {
  const refreshtoken = req.body.refreshtoken;
  jwt.verify(
    refreshtoken,
    process.env.REFRESH_TOKEN_KEY,
    function (err, decode) {
      if (err) {
        res.status(400).json({
          msg: "refresh token error",
          error: err,
        });
      } else {
        let token = jwt.sign(
          { name: decode.name },
          process.env.SECRET_TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        let refreshtoken = req.body.refreshtoken;
        res.status(200).json({ msg: "new tokens!", token, refreshtoken });
      }
    }
  );
};

module.exports = { adminLogin, adminRegister, refreshToken };
