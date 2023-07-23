const router = require("express").Router();
const User = require("../models/base/User");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    allowedFactories: req.body.allowedFactories,
    allowedFeatures: req.body.allowedFeatures,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(401).json("Wrong User Name");

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        allowedFactories: user.allowedFactories,
        allowedFeatures: user.allowedFeatures,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "10h" }
    );

    res.status(200).json(accessToken);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
  Login with google - https://chat.openai.com/share/6d450e0c-955f-44bf-a816-32f98497a6eb
*/

module.exports = router;
