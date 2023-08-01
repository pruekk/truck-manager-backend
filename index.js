const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const factoryRoute = require("./routes/factory");
const oilRoute = require("./routes/oil");
const carRoute = require("./routes/car");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/factory", factoryRoute);
app.use("/api/oil", oilRoute);
app.use("/api/car", carRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log("Backend server is running!");
});
