import menuItemModel from "../models/MenuItem.js";

class MenuItemService {
  // get all items
  async getAllItems() {
    const menuItems = await menuItemModel.find();
    return menuItems;
  }

  //   get single item
  async getMenuItemById(id) {
    const menuItem = await menuItemModel.findById(id);
    return menuItem;
  }

  //  create new menu item
  async createMenuItem(data) {
    const menuItem = await menuItemModel.insertOne(data);
    return menuItem;
  }

  //   update menu item
  async updateMenuItem(id, data) {
    const menuItem = await menuItemModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return menuItem;
  }

  //   delete menu item
  async deleteMenuItem(id) {
    const menuItem = await menuItemModel.findByIdAndDelete(id);
    return menuItem;
  }
}

export default new MenuItemService();
