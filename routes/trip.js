const Trip = require("../models/base/Trip");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newTrip = new Trip(req.body);
  try {
    const savedTrip = await newTrip.save();
    res.status(200).json(savedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:factoryId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { factoryId: req.params.factoryId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete(
  "/:factoryId&:tripName&:date",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      await Trip.findOneAndDelete({
        factoryId: req.params.factoryId,
        tripName: req.params.tripName,
        date: req.params.date,
      });
      res.status(200).json("Trip has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET
router.get("/:factoryId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Trips = await Trip.findOne({ factoryId: req.params.factoryId });
    res.status(200).json(Trips);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Trips = await Trip.find();
    res.status(200).json(Trips);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
