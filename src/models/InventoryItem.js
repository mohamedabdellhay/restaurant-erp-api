import mongoose from "mongoose";

const InventoryItemSchema = new mongoose.Schema({
  name: String,
  sku: String,
  unit: String, // kg, g, piece, litre
  costPrice: Number,
  stock: { type: Number, default: 0 },
  minStockAlert: { type: Number, default: 0 },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model("Inventory", InventoryItemSchema);
