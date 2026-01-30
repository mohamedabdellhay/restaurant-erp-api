import RestaurantModel from "../models/Restaurant.js";

class RestaurantService {
  // get all restaurant
  async getAll() {
    const allRestaurant = await RestaurantModel.find();
    return allRestaurant;
  }

  //   create new restaurant
  async create(data) {
    const restaurant = await RestaurantModel.insertOne(data);
    return restaurant;
  }

  async update(id, data) {
    const restaurant = await RestaurantModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return restaurant;
  }
}

export default new RestaurantService();
