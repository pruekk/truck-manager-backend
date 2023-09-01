const router = require("express").Router();
const { validateInput } = require("../controller/auth");
const User = require("../models/base/User");
const { delay } = require("../utils/delay");
const {
  customizeJwtToken,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const { OAuth2Client } = require("google-auth-library");
const Client = new OAuth2Client();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    isAdmin: req.body.isAdmin || false,
    allowedFactories: req.body.allowedFactories || [],
    allowedFeatures: req.body.allowedFeatures || [],
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

    const result = await customizeJwtToken(payload["email"]);
    // await delay(5);
    if (!result.error) {
      console.info(`${new Date()} User: ${payload["email"]} login!`);
      return res.status(200).json({
        ...result,
        picture: payload["picture"],
        displayName: payload["name"],
      });
    }

    console.info(`${new Date()} User: ${payload["email"]} login failed!`);
    return res.status(401).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/user/:email", verifyTokenAndAdmin, async (req, res) => {
  try {
    const result = validateInput({ ...req.body });
    if (!result.success) {
      res.status(403).json(result.error);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: result.data.email },
      {
        $set: result.data,
      },
      { new: true }
    );

    res.status(200).json({
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      allowedFactories: updatedUser.allowedFactories,
      allowedFeatures: updatedUser.allowedFeatures,
      is_actived: updatedUser.is_actived,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
