const mongoose = require("mongoose");

const AgencySchema = new mongoose.Schema(
  {
    agencyId: { type: String, required: true, unique: true },
    factoryId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    startDate: { type: Date },
    openDistanceCode: { type: String },
    distanceCode: { type: String },
    distanceRange: { type: Number },
    oil: { type: Number },
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agency", AgencySchema);
