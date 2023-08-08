const morgan = require("morgan");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const ConnectionDB = require("./database/db.js");
const userRoute = require("./routes/userRoutes.js");
const adminRoute = require("./routes/adminRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const commentRoute = require("./routes/commentRoutes.js");
const saveRoute = require("./routes/saveRoutes.js");
const cartRoute = require("./routes/cartRouters.js");
const CatRoutes = require("./routes/CategoriesRoutes.js");
const colorRoutes = require("./routes/colorRoutes.js");
const path = require("path");
const orderRoute = require("./routes/orderRoutes.js");
const userAddressRoute = require("./routes/userAddressRoutes.js");
const UserCheckOutRoute = require("./routes/checkOutItemRoutes.js");

dotenv.config();

const PORT = process.env.PORT || 5666;
const MONGODB_URL = process.env.MONGODB_URL;
const imagesDir = path.join(__dirname, "./uploads");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/images", express.static(imagesDir));
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/comment", commentRoute);
app.use("/save", saveRoute);
app.use("/cart", cartRoute);
app.use("/checkout", UserCheckOutRoute);
app.use("/categories", CatRoutes);
app.use("/colors", colorRoutes);
app.use("/order", orderRoute);
app.use("/useraddress", userAddressRoute);

ConnectionDB(MONGODB_URL);

app.listen(PORT, () => {
  console.log("Listening to PORT: ", PORT);
});
