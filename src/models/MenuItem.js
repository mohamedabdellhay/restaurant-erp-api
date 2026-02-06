import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    recipe: [
      {
        inventoryItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InventoryItem",
        },
        qty: {
          type: Number,
          min: [0, "Quantity cannot be negative"],
        },
      },
    ],
    modifiers: [
      {
        name: { type: String, required: true },
        price: { type: Number, default: 0 },
        required: { type: Boolean, default: false },
      },
    ],
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("MenuItem", MenuItemSchema);
