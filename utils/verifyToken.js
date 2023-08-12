const jwt = require("jsonwebtoken");
const User = require("../models/base/User");

const customizeJwtToken = async (reqEmail) => {
  const user = await User.findOne({
    email: reqEmail,
  });

  !user && res.status(401).json("Wrong User Name");

  return jwt.sign(
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
};

const verifyToken = (req, res, next) => {
  let jwtToken = "";
  if (req.headers["user-agent"].includes("Postman")) {
    jwtToken = req.headers.authorization.split(" ")[1];
  } else {
    jwtToken = req.user.access_token;
  }
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.JWT_TOKEN, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      const userFeature = req.headers.feature;
      const userAction = req.headers.action;

      const matchedFeature = req.user.allowedFeatures.find(
        (feature) => feature.name === userFeature
      );
      if (matchedFeature) {
        switch (userAction) {
          case "view":
            return matchedFeature.view && next();
          case "add":
            return matchedFeature.add && next();
          case "edit":
            return matchedFeature.edit && next();
          case "delete":
            return matchedFeature.delete && next();
          default:
            return false;
        }
      } else {
        res
          .status(403)
          .json(
            `Permission denied for ${userFeature} with action ${userAction}`
          );
      }
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  customizeJwtToken
};
