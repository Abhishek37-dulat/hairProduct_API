const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
