import menuItemModel from "../models/MenuItem.js";

class MenuItemService {
  async getAllItems(filter = {}) {
    return await menuItemModel
      .find(filter)
      .populate("category", "name")
      .sort({ name: 1 });
  }

  async getMenuItemById(id) {
    return await menuItemModel.findById(id).populate("category", "name");
  }

  async createMenuItem(data) {
    return await menuItemModel.create(data);
  }

  async updateMenuItem(id, data) {
    return await menuItemModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .populate("category", "name");
  }

  async deleteMenuItem(id) {
    return await menuItemModel.findByIdAndDelete(id);
  }
}

export default new MenuItemService();
