import RestaurantService from "../services/RestaurantService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class RestaurantController {
  // get all restaurant
  index = asyncHandler(async (req, res) => {
    const allRestaurant = await RestaurantService.getAll();
    ResponseHandler.success(res, allRestaurant, "success", 200);
  });

  // create new restaurant
  create = asyncHandler(async (req, res) => {
    const data = req.body;
    const restaurant = await RestaurantService.create(data);
    ResponseHandler.created(res, restaurant, "success");
  });

  // update restaurant
  update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    console.log(id);

    const restaurant = await RestaurantService.update({ _id: id }, data);
    ResponseHandler.updated(res, restaurant, "restaurant updated successfully");
  });
}

export default new RestaurantController();
