import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema({
  inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
  qty: Number, // positive for in, negative for out
  type: { type: String, enum: ["sale", "purchase", "adjustment", "opening"] },
  refId: mongoose.Schema.Types.ObjectId, // orderId or purchaseId
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
});

export default mongoose.model("StockMovement", StockMovementSchema);
