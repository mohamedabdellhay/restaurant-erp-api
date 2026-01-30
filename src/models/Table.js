// models/Table.js
import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    number: { type: String, required: true }, // e.g. "T1", "T2", "VIP-1"
    seats: { type: Number, default: 2 }, // capacity
    status: {
      type: String,
      enum: ["available", "occupied", "reserved", "inactive"],
      default: "available",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  {
    timeseries: true,
  }
);

export default mongoose.model("Table", TableSchema);
