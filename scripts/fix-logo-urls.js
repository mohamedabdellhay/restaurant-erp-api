import dotenv from "dotenv";
import mongoose from "mongoose";
import RestaurantModel from "../src/models/Restaurant.js";

dotenv.config();

/**
 * Migration script to fix malformed logo URLs in the database
 * Removes duplicate BASE_URL prefixes from logo paths
 */

const stripBaseUrl = (url) => {
  if (!url) return url;

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  // Remove the base URL if it exists (handle multiple occurrences)
  let cleanUrl = url;
  while (cleanUrl.startsWith(baseUrl)) {
    cleanUrl = cleanUrl.substring(baseUrl.length);
  }

  // Also handle https URLs
  const httpsBaseUrl = baseUrl.replace("http://", "https://");
  while (cleanUrl.startsWith(httpsBaseUrl)) {
    cleanUrl = cleanUrl.substring(httpsBaseUrl.length);
  }

  // Ensure the path starts with / if it's a relative path
  if (cleanUrl && !cleanUrl.startsWith("/") && !cleanUrl.startsWith("http")) {
    cleanUrl = "/" + cleanUrl;
  }

  return cleanUrl;
};

const fixLogoUrls = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find all restaurants
    const restaurants = await RestaurantModel.find({});
    console.log(`Found ${restaurants.length} restaurants`);

    let updatedCount = 0;

    for (const restaurant of restaurants) {
      let needsUpdate = false;
      const updates = {};

      // Check and fix main logo
      if (restaurant.logo) {
        const cleanedLogo = stripBaseUrl(restaurant.logo);
        if (cleanedLogo !== restaurant.logo) {
          console.log(`\nRestaurant: ${restaurant.name || restaurant._id}`);
          console.log(`  Old logo: ${restaurant.logo}`);
          console.log(`  New logo: ${cleanedLogo}`);
          updates.logo = cleanedLogo;
          needsUpdate = true;
        }
      }

      // Check and fix theme logo
      if (restaurant.settings?.theme?.logo) {
        const cleanedThemeLogo = stripBaseUrl(restaurant.settings.theme.logo);
        if (cleanedThemeLogo !== restaurant.settings.theme.logo) {
          console.log(`\nRestaurant: ${restaurant.name || restaurant._id}`);
          console.log(`  Old theme logo: ${restaurant.settings.theme.logo}`);
          console.log(`  New theme logo: ${cleanedThemeLogo}`);
          if (!updates.settings) {
            updates.settings = { ...restaurant.settings.toObject() };
          }
          updates.settings.theme = {
            ...restaurant.settings.theme.toObject(),
            logo: cleanedThemeLogo,
          };
          needsUpdate = true;
        }
      }

      // Update if needed
      if (needsUpdate) {
        await RestaurantModel.findByIdAndUpdate(restaurant._id, updates);
        updatedCount++;
        console.log(`  ✓ Updated`);
      }
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`   Total restaurants: ${restaurants.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Unchanged: ${restaurants.length - updatedCount}`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\nDisconnected from MongoDB");
  }
};

// Run the migration
fixLogoUrls();
