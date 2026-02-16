import mongoose from "mongoose";

const SupplierTransactionSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    type: {
      type: String,
      enum: ["purchase", "payment", "adjustment"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
    referenceId: mongoose.Schema.Types.ObjectId, // Link to StockMovement or other records
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("SupplierTransaction", SupplierTransactionSchema);
