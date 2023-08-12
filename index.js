const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");

const auth = require("./routes/auth");
const authRoute = auth.router;
const googleStrategy = auth.strategy;

const factoryRoute = require("./routes/factory");
const oilRoute = require("./routes/oil");
const carRoute = require("./routes/car");
const employeeRoute = require("./routes/employee");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
  // You can choose how to store the user data in the session.
  // In this case, we'll store the entire profile object.
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // If you stored more than the profile object in the session,
  // you can retrieve the user data here.
  done(null, user);
});

app.use("/api/auth", authRoute);
app.use("/api/factory", factoryRoute);
app.use("/api/oil", oilRoute);
app.use("/api/car", carRoute);
app.use("/api/employee", employeeRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log("Backend server is running!");
});
