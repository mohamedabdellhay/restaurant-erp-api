import RestaurantModel from "../models/Restaurant.js";

class RestaurantService {
  /**
   * Helper to strip BASE_URL from logo paths
   * Ensures only relative paths are stored in the database
   */
  stripBaseUrl(url) {
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
  }

  /**
   * Clean logo URLs from data object
   */
  cleanLogoUrls(data) {
    const cleanedData = { ...data };

    // Clean main logo
    if (cleanedData.logo) {
      cleanedData.logo = this.stripBaseUrl(cleanedData.logo);
    }

    // Clean theme logo
    if (cleanedData.settings?.theme?.logo) {
      cleanedData.settings.theme.logo = this.stripBaseUrl(
        cleanedData.settings.theme.logo,
      );
    }

    return cleanedData;
  }

  // get all restaurants
  async getAll() {
    const allRestaurants = await RestaurantModel.find();
    return allRestaurants;
  }

  // get current restaurant settings
  async getCurrent() {
    const restaurant = await RestaurantModel.findOne().sort({ createdAt: -1 });
    return restaurant;
  }

  // create new restaurant
  async create(data) {
    const cleanedData = this.cleanLogoUrls(data);
    const restaurant = await RestaurantModel.create(cleanedData);
    return restaurant;
  }

  async update(id, data) {
    const cleanedData = this.cleanLogoUrls(data);
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      cleanedData,
      {
        new: true,
        runValidators: true,
      },
    );
    return restaurant;
  }
}

export default new RestaurantService();
