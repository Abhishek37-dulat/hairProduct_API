const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      minLength: 2,
      maxLength: 50,
      require: true,
    },
    last_name: {
      type: String,
      minLength: 2,
      maxLength: 50,
      require: true,
    },
    email: {
      type: String,
      minLength: 15,
      maxLength: 100,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      minLength: 10,
      maxLength: 10,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
      require: true,
    },
    zip_code: {
      type: Number,
      minLength: 6,
      maxLength: 6,
      require: true,
    },
    company_name: {
      type: String,
      minLength: 2,
      maxLength: 200,
      require: true,
    },
    company_location: {
      type: String,
      minLength: 10,
      require: true,
    },
    company_logo: {
      type: String,
    },
    company_registration_number: {
      type: String,
      minLength: 21,
      maxLength: 21,
      require: true,
    },
    company_type: {
      type: String,
      require: true,
    },
    company_since: {
      type: String,
      require: true,
    },
    total_outlets: {
      type: Number,
      require: true,
    },
    headquater_location: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    number_of_employee: {
      type: Number,
      min: 1,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
