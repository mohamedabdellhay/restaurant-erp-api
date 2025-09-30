import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  isActive: { type: Boolean, default: true },
  // recipe: list of inventory item usages
  recipe: [
    {
      inventoryItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryItem",
      },
      qty: Number, // quantity consumed per one sold (in same unit basis)
    },
  ],
  modifiers: [{ name: String, price: Number, required: Boolean }],
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model("MenuItem", MenuItemSchema);
