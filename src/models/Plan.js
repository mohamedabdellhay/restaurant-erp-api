import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Basic", "Standard", "Premium"],
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "EGP",
    },
    features: [
      {
        type: String,
      },
    ],
    limits: {
      users: { type: Number, default: 1 }, // Number of users allowed
      branches: { type: Number, default: 1 }, // Number of branches allowed
      tables: { type: Number },
      // Add other limits as needed
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Plan", PlanSchema);
