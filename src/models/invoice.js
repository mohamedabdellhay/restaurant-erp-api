import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // الفاتورة مرتبطة بالطلب
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ممكن يكون مرتبط بالعميل المسجل
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table", // لو الطلب داخل المطعم
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem", // العنصر في المنيو
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // سعر الوحدة وقت الفاتورة
        total: { type: Number, required: true }, // quantity * price
      },
    ],
    subTotal: {
      type: Number,
      required: true,
    },
    taxPercent: {
      type: Number,
      default: 0,
    },
    serviceChargePercent: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0, // خصم لو فيه كوبون أو عرض
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "wallet", "online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "unpaid",
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // الكاشير أو الموظف اللي عمل الفاتورة
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
