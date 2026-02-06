import InventoryItemModel from "../models/InventoryItem.js";

class InventoryService {
  async getAllItems(filter = {}) {
    return await InventoryItemModel.find(filter)
      .populate("supplier", "name")
      .populate("restaurant", "name")
      .sort({ name: 1 });
  }

  async getItemById(id) {
    return await InventoryItemModel.findById(id)
      .populate("supplier", "name email phone")
      .populate("restaurant", "name");
  }

  async createItem(data) {
    return await InventoryItemModel.create(data);
  }

  async updateItem(id, data) {
    return await InventoryItemModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async updateStock(id, amount, type = "addition") {
    const item = await InventoryItemModel.findById(id);
    if (!item) throw new Error("Inventory item not found");

    if (type === "addition") {
      item.stock += amount;
    } else if (type === "deduction") {
      item.stock -= amount;
    }

    return await item.save();
  }

  async deleteItem(id) {
    return await InventoryItemModel.findByIdAndDelete(id);
  }

  async getLowStockItems() {
    return await InventoryItemModel.find({
      $expr: { $lte: ["$stock", "$minStockAlert"] },
    }).populate("supplier", "name email");
  }
}

export default new InventoryService();
