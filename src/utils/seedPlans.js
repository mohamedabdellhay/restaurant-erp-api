import mongoose from "mongoose";
import "dotenv/config";
import Plan from "../models/Plan.js";

const plans = [
  {
    name: "Basic",
    price: 1500,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
    ],
    limits: {
      users: 2, // Example limit
      branches: 1,
    },
    description: "For small restaurants.",
  },
  {
    name: "Standard",
    price: 3000,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
      "inventory",
      "table_management",
      "staff_management",
      "advanced_reports",
      "user_roles",
    ],
    limits: {
      users: 5,
      branches: 1,
    },
    description: "For medium restaurants.",
  },
  {
    name: "Premium",
    price: 6000,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
      "inventory",
      "table_management",
      "staff_management",
      "advanced_reports",
      "user_roles",
      "multi_branch",
      "dashboard",
      "api_integration",
      "loyalty_system",
      "fast_support",
    ],
    limits: {
      users: 999,
      branches: 999,
    },
    description: "For large restaurants or chains.",
  },
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    for (const planData of plans) {
      const existing = await Plan.findOne({ name: planData.name });
      if (existing) {
        console.log(`Plan ${planData.name} already exists. Updating...`);
        // Optional: Update if needed. For now, we skip or update price/features
        existing.price = planData.price;
        existing.features = planData.features;
        existing.limits = planData.limits;
        existing.description = planData.description;
        await existing.save();
      } else {
        await Plan.create(planData);
        console.log(`Created Plan: ${planData.name}`);
      }
    }

    console.log("Plans seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding plans:", error);
    process.exit(1);
  }
};

seedPlans();
