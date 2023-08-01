const Employee = require("../models/base/Employee");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:idCard", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { idCard: req.params.idCard },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:idCard", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Employee.findOneAndDelete({ idCard: req.params.idCard });
    res.status(200).json("Employee has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:idCard", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const Employees = await Employee.findOne({ idCard: req.params.idCard });
    res.status(200).json(Employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Employees = await Employee.find();
    res.status(200).json(Employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
