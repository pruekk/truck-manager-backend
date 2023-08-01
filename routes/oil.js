const Oil = require("../models/base/Oil");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { formatDate } = require("../utils/formatDate");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  if (req.body.startDate) {
    req.body.startDate = formatDate(req.body.startDate);
  }

  const newOil = new Oil(req.body);
  try {
    const savedOil = await newOil.save();
    res.status(200).json(savedOil);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    if (req.body.startDate) {
      req.body.startDate = formatDate(req.body.startDate);
    }
    const updatedOil = await Oil.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOil);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Oil.findByIdAndDelete(req.params.id);
    res.status(200).json("Oil has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Oils = await Oil.findById(req.params.id);
    res.status(200).json(Oils);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Oils = await Oil.find();
    res.status(200).json(Oils);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
