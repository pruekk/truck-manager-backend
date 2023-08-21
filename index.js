const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const { MONGO_CONNECTION_SUCCESS } = require("./utils/handleResponse");
const authRoute = require("./routes/auth");
const factoryRoute = require("./routes/factory");
const oilRoute = require("./routes/oil");
const carRoute = require("./routes/car");
const employeeRoute = require("./routes/employee");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(MONGO_CONNECTION_SUCCESS))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/factory", factoryRoute);
app.use("/api/oil", oilRoute);
app.use("/api/car", carRoute);
app.use("/api/employee", employeeRoute);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
