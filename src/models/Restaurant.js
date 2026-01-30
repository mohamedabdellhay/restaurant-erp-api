import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    currency: { type: String, default: "EGP" },
    settings: {
      taxPercent: { type: Number, default: 0 },
      serviceChargePercent: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", RestaurantSchema);
