const Car = require("../models/base/Car");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCar = new Car(req.body);
  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:carId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { carId: req.params.carId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:carId", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Car.findOneAndDelete({ carId: req.params.carId });
    res.status(200).json("Car has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:carId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Cars = await Car.findOne({ carId: req.params.carId });
    res.status(200).json(Cars);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Cars = await Car.find();
    res.status(200).json(Cars);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
