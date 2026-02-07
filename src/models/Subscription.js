import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
    },
    paymentDetails: {
      transactionId: String,
      amount: Number,
      currency: String,
      paymentMethod: String,
      paidAt: Date,
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Index to quickly find active subscription for a restaurant
SubscriptionSchema.index({ restaurant: 1, status: 1 });

export default mongoose.model("Subscription", SubscriptionSchema);
