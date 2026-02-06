// models/Table.js
import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, "Table number is required"],
      trim: true,
      unique: true, // Assuming table numbers are unique within a restaurant context
    },
    seats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: [1, "Seats must be at least 1"],
      default: 2,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved", "inactive"],
      default: "available",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Table", TableSchema);
