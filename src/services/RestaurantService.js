import RestaurantModel from "../models/Restaurant.js";

class RestaurantService {
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
    const restaurant = await RestaurantModel.create(data);
    return restaurant;
  }

  async update(id, data) {
    const restaurant = await RestaurantModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return restaurant;
  }
}

export default new RestaurantService();
