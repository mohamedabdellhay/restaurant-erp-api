import InventoryItemModel from "../models/InventoryItem.js";
import StockMovementModel from "../models/StockMovement.js";
import SupplierTransactionModel from "../models/SupplierTransaction.js";
import SupplierModel from "../models/supplier.js";

class InventoryService {
  async getAllItems(restaurantId, filter = {}) {
    return await InventoryItemModel.find({
      ...filter,
      restaurant: restaurantId,
    })
      .populate("supplier", "name")
      .populate("restaurant", "name")
      .sort({ name: 1 });
  }

  async getItemById(id, restaurantId) {
    return await InventoryItemModel.findOne({
      _id: id,
      restaurant: restaurantId,
    })
      .populate("supplier", "name email phone")
      .populate("restaurant", "name");
  }

  async createItem(data) {
    return await InventoryItemModel.create(data);
  }

  async updateItem(id, restaurantId, data) {
    return await InventoryItemModel.findOneAndUpdate(
      { _id: id, restaurant: restaurantId },
      data,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async updateStock(id, restaurantId, amount, type = "addition", userId) {
    const item = await InventoryItemModel.findOne({
      _id: id,
      restaurant: restaurantId,
    });
    if (!item) throw new Error("Inventory item not found");

    const oldStock = item.stock;
    if (type === "addition") {
      item.stock += amount;
    } else if (type === "deduction") {
      item.stock -= amount;
    }

    const savedItem = await item.save();

    // Log stock movement
    const movement = await StockMovementModel.create({
      inventoryItem: id,
      qty: type === "addition" ? amount : -amount,
      type: type === "addition" ? "purchase" : "adjustment",
      createdBy: userId,
    });

    // If it's a purchase (addition), update supplier balance and log transaction
    if (type === "addition" && item.supplier) {
      const purchaseAmount = amount * item.costPrice;

      // Create financial transaction
      await SupplierTransactionModel.create({
        supplier: item.supplier,
        restaurant: restaurantId,
        type: "purchase",
        amount: purchaseAmount,
        description: `Purchased ${amount} ${item.unit} of ${item.name}`,
        referenceId: movement._id,
        createdBy: userId,
      });

      // Update supplier balance
      await SupplierModel.findByIdAndUpdate(item.supplier, {
        $inc: { balance: purchaseAmount },
      });
    }

    return savedItem;
  }

  async deleteItem(id, restaurantId) {
    return await InventoryItemModel.findOneAndDelete({
      _id: id,
      restaurant: restaurantId,
    });
  }

  async getLowStockItems(restaurantId) {
    return await InventoryItemModel.find({
      restaurant: restaurantId,
      $expr: { $lte: ["$stock", "$minStockAlert"] },
    }).populate("supplier", "name email");
  }
}

export default new InventoryService();
