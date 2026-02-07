import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Restaurant address is required"],
    },
    phone: {
      type: String,
      required: [true, "Restaurant phone is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    website: String,
    logo: String,
    currency: { type: String, default: "EGP" },
    settings: {
      taxPercent: { type: Number, default: 0 },
      serviceChargePercent: { type: Number, default: 0 },
    },
    openingHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
    },
    vatNumber: String,
    crNumber: String, // Commercial Registration Number
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

RestaurantSchema.virtual("subscription", {
  ref: "Subscription",
  localField: "_id",
  foreignField: "restaurant",
  justOne: true,
  match: { status: "active" }, // By default return active one, or we can remove match to get any
});

export default mongoose.model("Restaurant", RestaurantSchema);
