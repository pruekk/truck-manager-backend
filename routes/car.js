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
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("Car has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Cars = await Car.findById(req.params.id);
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
