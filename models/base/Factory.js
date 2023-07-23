const mongoose = require("mongoose");

const FactorySchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    factoryCode: { type: String, required: true, unique: true },
    startDate: { type: Date, default: Date.now },
    address: { type: String },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Factory", FactorySchema);
