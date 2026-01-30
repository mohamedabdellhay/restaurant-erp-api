import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { bcryptConfig } from "../config/jwt.js";

const StaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "manager", "cashier", "chef", "waiter"],
      default: "cashier",
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Hash password before saving
StaffSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    return next();
  }

  this.passwordHash = await bcrypt.hash(
    this.passwordHash,
    bcryptConfig.saltRounds,
  );
  next();
});

// Compare password method
StaffSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Remove sensitive data from JSON response
StaffSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export default mongoose.model("Staff", StaffSchema);
