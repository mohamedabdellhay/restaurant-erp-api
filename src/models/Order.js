import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderNumber: Number,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  type: { type: String, enum: ["dineIn", "takeaway", "delivery"] },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" }, // table id
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      qty: Number,
      price: Number,
      modifiers: [{ name: String, price: Number }],
    },
  ],
  subtotal: Number,
  tax: Number,
  serviceCharge: Number,
  total: Number,
  status: {
    type: String,
    enum: ["pending", "in_kitchen", "served", "paid", "cancelled"],
    default: "pending",
  },
  payment: {
    method: { type: String, enum: ["cash", "card", "online"] },
    paidAt: Date,
    amount: Number,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
