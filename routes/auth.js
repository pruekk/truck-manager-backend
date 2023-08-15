const router = require("express").Router();
const passport = require("passport");
const User = require("../models/base/User");
const {
  verifyTokenAndAdmin,
  customizeJwtToken,
} = require("../utils/verifyToken");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const customToken = await customizeJwtToken(profile.emails[0].value);
      return done(null, { ...profile, access_token: customToken });
    } catch (err) {
      return done(err, null);
    }
  }
);

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    isAdmin: req.body.isAdmin || false,
    allowedFactories: req.body.allowedFactories,
    allowedFeatures: req.body.allowedFeatures,
    is_actived: req.body.is_actived || false,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN WITH POSTMAN
router.post("/login-postman", async (req, res) => {
  if (req.headers.host.includes("localhost")) {
    try {
      const customToken = await customizeJwtToken(req.body.email);
      console.log(`User: ${req.body.email} login!`);
      res.status(200).json(customToken);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(405).json({});
  }
});

//LOGIN
router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

//OAuth Full Cycle Get accessToken and refreshToken from DB
// router.post("/token", (req, res) => {
//   res.status(200).json({});
// });

module.exports = { router, strategy };
