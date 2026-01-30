import InventoryItemModel from "../models/InventoryItem.js";

class InventoryItemService {
  async getAllItems() {
    const inventoryItems = await InventoryItemModel.find();
    return inventoryItems;
  }

  async getItemById(id) {
    const item = await InventoryItemModel.findById(id);
    return item;
  }

  async createItem(data) {
    const item = await InventoryItemModel.insertOne(data);
    return item;
  }

  async updateItem(id, data) {
    const item = await InventoryItemModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return item;
  }

  async deleteItem(id) {
    const item = await InventoryItemModel.findByIdAndDelete(id);
    return item;
  }
}

export default new InventoryItemService();
