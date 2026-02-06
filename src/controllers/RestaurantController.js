import RestaurantService from "../services/RestaurantService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class RestaurantController {
  // get all restaurants
  index = asyncHandler(async (req, res) => {
    const allRestaurants = await RestaurantService.getAll();
    ResponseHandler.success(
      res,
      allRestaurants,
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
    ResponseHandler.success(
      res,
      restaurant,
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
    ResponseHandler.success(res, restaurant, "Restaurant updated successfully");
  });
}

export default new RestaurantController();
