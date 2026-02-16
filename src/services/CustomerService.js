import CustomerModel from "../models/Customer.js";

class CustomerService {
  async getAll(restaurantId) {
    return await CustomerModel.find({ restaurant: restaurantId }).sort({
      createdAt: -1,
    });
  }

  async getById(id, restaurantId) {
    return await CustomerModel.findOne({ _id: id, restaurant: restaurantId });
  }

  async create(data) {
    return await CustomerModel.create(data);
  }

  async update(id, restaurantId, data) {
    return await CustomerModel.findOneAndUpdate(
      { _id: id, restaurant: restaurantId },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async delete(id, restaurantId) {
    return await CustomerModel.findOneAndDelete({
      _id: id,
      restaurant: restaurantId,
    });
  }

  async search(query, restaurantId) {
    if (!query) return [];

    // Search by name or phone (partial match) within the restaurant
    const searchFilter = {
      restaurant: restaurantId,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    };

    return await CustomerModel.find(searchFilter).sort({ createdAt: -1 });
  }
}

export default new CustomerService();
