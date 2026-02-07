import dotenv from "dotenv";
dotenv.config();
import RestaurantService from "../services/RestaurantService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class RestaurantController {
  // get all restaurants
  index = asyncHandler(async (req, res) => {
    const allRestaurants = await RestaurantService.getAll();

    // Append BASE_URL to logo URLs
    const restaurantsWithFullUrl = allRestaurants.map((restaurant) => {
      const restaurantObj = restaurant.toObject();
      if (restaurantObj.logo) {
        restaurantObj.logo = `${process.env.BASE_URL}${restaurantObj.logo}`;
      }
      if (restaurantObj.settings?.theme?.logo) {
        restaurantObj.settings.theme.logo = `${process.env.BASE_URL}${restaurantObj.settings.theme.logo}`;
      }
      return restaurantObj;
    });

    ResponseHandler.success(
      res,
      restaurantsWithFullUrl,
      "Restaurants retrieved successfully",
      200,
    );
  });

  // get current restaurant settings
  getCurrent = asyncHandler(async (req, res) => {
    const restaurant = await RestaurantService.getCurrent();
    if (!restaurant) {
      return ResponseHandler.success(
        res,
        {},
        "No restaurant settings found",
        200,
      );
    }

    // Convert to plain object and append BASE_URL to logo
    const restaurantObj = restaurant.toObject();

    // Helper to safely append BASE_URL
    const safeAppendBaseUrl = (url) => {
      if (!url) return url;
      if (url.startsWith("http://") || url.startsWith("https://")) return url;
      return `${process.env.BASE_URL}${url}`;
    };

    if (restaurantObj.logo) {
      restaurantObj.logo = safeAppendBaseUrl(restaurantObj.logo);
    }
    if (restaurantObj.settings?.theme?.logo) {
      restaurantObj.settings.theme.logo = safeAppendBaseUrl(
        restaurantObj.settings.theme.logo,
      );
    }

    ResponseHandler.success(
      res,
      restaurantObj,
      "Restaurant settings retrieved successfully",
      200,
    );
  });

  // create new restaurant
  create = asyncHandler(async (req, res) => {
    const data = req.body;
    const restaurant = await RestaurantService.create(data);
    ResponseHandler.created(
      res,
      restaurant,
      "Restaurant settings created successfully",
    );
  });

  // update restaurant
  update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const restaurant = await RestaurantService.update(id, data);
    if (!restaurant) {
      return ResponseHandler.error(res, "Restaurant not found", 404);
    }

    // Convert to plain object and append BASE_URL to logo
    const restaurantObj = restaurant.toObject();
    if (restaurantObj.logo) {
      restaurantObj.logo = `${process.env.BASE_URL}${restaurantObj.logo}`;
    }
    if (restaurantObj.settings?.theme?.logo) {
      restaurantObj.settings.theme.logo = `${process.env.BASE_URL}${restaurantObj.settings.theme.logo}`;
    }

    ResponseHandler.success(
      res,
      restaurantObj,
      "Restaurant updated successfully",
    );
  });

  // upload logo
  uploadLogo = asyncHandler(async (req, res) => {
    if (!req.file) {
      return ResponseHandler.error(res, "No file uploaded", 400);
    }

    const restaurantId = req.body.restaurantId || req.user?.restaurant;

    if (!restaurantId) {
      return ResponseHandler.error(res, "Restaurant ID is required", 400);
    }

    // Construct file URL
    const fileUrl = `/uploads/logos/${req.file.filename}`;

    // Update restaurant logo
    const restaurant = await RestaurantService.update(restaurantId, {
      logo: fileUrl,
    });

    if (!restaurant) {
      return ResponseHandler.error(res, "Restaurant not found", 404);
    }

    // Convert to plain object and append BASE_URL to logo
    const restaurantObj = restaurant.toObject();
    if (restaurantObj.logo) {
      restaurantObj.logo = `${process.env.BASE_URL}${restaurantObj.logo}`;
    }
    if (restaurantObj.settings?.theme?.logo) {
      restaurantObj.settings.theme.logo = `${process.env.BASE_URL}${restaurantObj.settings.theme.logo}`;
    }

    ResponseHandler.success(
      res,
      {
        logo: `${process.env.BASE_URL}${fileUrl}`,
        restaurant: restaurantObj,
      },
      "Logo uploaded successfully",
    );
  });
}

export default new RestaurantController();
