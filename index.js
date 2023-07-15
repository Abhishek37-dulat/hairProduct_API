const morgan = require("morgan");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const ConnectionDB = require("./database/db");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
dotenv.config();

const PORT = process.env.PORT || 5666;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRoute);
app.use("/admin", adminRoute);

ConnectionDB(MONGODB_URL);

app.listen(PORT, () => {
  console.log("Listening to PORT: ", PORT);
});
