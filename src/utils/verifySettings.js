import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

const verifySettings = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to database");

    // Find or create a test restaurant
    let restaurant = await Restaurant.findOne();

    if (!restaurant) {
      console.log("📝 No restaurant found, creating a test restaurant...");
      restaurant = await Restaurant.create({
        name: "Test Restaurant",
        address: "123 Test Street",
        phone: "+1234567890",
        email: "test@restaurant.com",
      });
      console.log("✅ Test restaurant created");
    }

    console.log("\n📋 Current restaurant settings:");
    console.log(JSON.stringify(restaurant.settings, null, 2));

    // Update with custom theme
    console.log("\n🎨 Updating theme settings...");
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant._id,
      {
        $set: {
          "settings.theme.primaryColor": "#3498db",
          "settings.theme.secondaryColor": "#2ecc71",
          "settings.theme.accentColor": "#e74c3c",
          "settings.theme.mode": "dark",
        },
      },
      { new: true, runValidators: true },
    );

    console.log("\n✅ Theme updated successfully!");
    console.log("📋 Updated settings:");
    console.log(JSON.stringify(updatedRestaurant.settings, null, 2));

    await mongoose.connection.close();
    console.log("\n✅ Verification complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

verifySettings();
