import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactPerson: {
      type: String,
      trim: true, // اسم الشخص المسؤول
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // المنتجات اللي بيوردها
      },
    ],
    paymentTerms: {
      type: String,
      enum: ["cash", "credit", "installment"],
      default: "cash",
    },
    balance: {
      type: Number,
      default: 0, // لو ليه فلوس لسه متسددتش
    },
    notes: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", SupplierSchema);
