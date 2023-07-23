const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
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
};
