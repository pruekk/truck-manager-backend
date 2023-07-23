const mongoose = require("mongoose");

const DeliveryPriceSchema = new mongoose.Schema(
  {
    factoryId: { type: String, required: true, unique: true },
    startDate: { type: Date },
    endDate: { type: Date },
    deliveryPrices: [
      {
        deliveryPriceId: { type: String },
        prices: [
          {
            amount: { type: Number },
            price: { type: Number, default: 0 },
          },
        ],
      },
    ],
    editBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryPrice", DeliveryPriceSchema);
