const router = require("express").Router();
const User = require("../models/base/User");
const { delay } = require("../utils/delay");
const { customizeJwtToken } = require("../utils/verifyToken");

const { OAuth2Client } = require("google-auth-library");
const Client = new OAuth2Client();

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
      const customTokenWithEmail = await customizeJwtToken(req.body.email);
      console.info(`${new Date()} User: ${req.body.email} login!`);
      res.status(200).json(customTokenWithEmail);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(405).json({});
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const ticket = await Client.verifyIdToken({
      idToken: req.body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const customTokenWithEmail = await customizeJwtToken(payload["email"]);
    console.info(`${new Date()} User: ${payload["email"]} login!`);
    // await delay(5);
    res.status(200).json(customTokenWithEmail);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
