const Factory = require("../models/base/Factory");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");
const { formatDate } = require("../utils/formatDate");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  if (req.body.startDate) {
    req.body.startDate = formatDate(req.body.startDate);
  }

  const newFactory = new Factory(req.body);
  try {
    const savedFactory = await newFactory.save();
    res.status(200).json(savedFactory);
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
    const updatedFactory = await Factory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFactory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Factory.findByIdAndDelete(req.params.id);
    res.status(200).json("Factory has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Factorys = await Factory.findById(req.params.id);
    res.status(200).json(Factorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Factorys = await Factory.find();
    res.status(200).json(Factorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
