const jwt = require("jsonwebtoken");
const User = require("../models/base/User");
const {
  ACCOUNT_NOT_ACTIVED,
  ACCOUNT_LOGIN_FAILED,
  USER_NOT_FOUND,
  USER_NOT_LOGIN,
  ACTION_NOT_ALLOW,
  ACCOUNT_LOGIN_TIMEOUT,
} = require("./handleResponse");

const customizeJwtToken = async (reqEmail) => {
  const user = await User.findOne({
    email: reqEmail,
  });

  if (!user) {
    return {
      error: true,
      message: USER_NOT_FOUND,
      email: reqEmail,
    };
  }

  const customToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      allowedFactories: user.allowedFactories,
      allowedFeatures: user.allowedFeatures,
      is_actived: user.is_actived,
    },
    process.env.JWT_TOKEN,
    { expiresIn: "10h" }
  );

  return {
    error: false,
    customToken: customToken,
    email: user.email,
    isAdmin: user.isAdmin,
    allowedFactories: user.allowedFactories,
    allowedFeatures: user.allowedFeatures,
    is_actived: user.is_actived,
  };
};

const verifyToken = (req, res, next) => {
  try {
    const jwtToken = req.headers["user-agent"].includes("Postman")
      ? req.headers.authorization.split(" ")[1]
      : req.user.access_token;
    jwt.verify(jwtToken, process.env.JWT_TOKEN, (err, user) => {
      if (err) res.status(401).json(ACCOUNT_LOGIN_FAILED);

      !user.is_actived && res.status(401).json(ACCOUNT_NOT_ACTIVED);

      const currentTime = Math.floor(Date.now() / 1000);
      if (user.exp && currentTime > user.exp) {
        res.status(401).json(ACCOUNT_LOGIN_TIMEOUT);
      }

      req.user = user;
      next();
    });
  } catch {
    return res.status(401).json(USER_NOT_LOGIN);
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
        res.status(403).json(ACTION_NOT_ALLOW);
      }
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json(ACTION_NOT_ALLOW);
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  customizeJwtToken,
};
