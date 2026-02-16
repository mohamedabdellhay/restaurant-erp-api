import InventoryService from "../services/InventoryService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class InventoryItemController {
  index = asyncHandler(async (req, res) => {
    const items = await InventoryService.getAllItems(req.user.restaurant);
    ResponseHandler.success(
      res,
      items,
      "Inventory items retrieved successfully",
    );
  });

  getIngredientById = asyncHandler(async (req, res) => {
    const item = await InventoryService.getItemById(
      req.params.id,
      req.user.restaurant,
    );
    if (!item) {
      return ResponseHandler.error(res, "Inventory item not found", 404);
    }
    ResponseHandler.success(res, item, "Inventory item retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const data = { ...req.body, restaurant: req.user.restaurant };
    const item = await InventoryService.createItem(data);
    ResponseHandler.created(res, item, "Inventory item created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const item = await InventoryService.updateItem(
      req.params.id,
      req.user.restaurant,
      req.body,
    );
    if (!item) {
      return ResponseHandler.error(res, "Inventory item not found", 404);
    }
    ResponseHandler.success(res, item, "Inventory item updated successfully");
  });

  updateStock = asyncHandler(async (req, res) => {
    const { amount, type } = req.body;
    const item = await InventoryService.updateStock(
      req.params.id,
      req.user.restaurant,
      amount,
      type,
      req.user._id,
    );
    ResponseHandler.success(res, item, "Stock updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const item = await InventoryService.deleteItem(
      req.params.id,
      req.user.restaurant,
    );
    if (!item) {
      return ResponseHandler.error(res, "Inventory item not found", 404);
    }
    ResponseHandler.success(res, null, "Inventory item deleted successfully");
  });

  getLowStock = asyncHandler(async (req, res) => {
    const items = await InventoryService.getLowStockItems(req.user.restaurant);
    ResponseHandler.success(
      res,
      items,
      "Low stock items retrieved successfully",
    );
  });
}

export default new InventoryItemController();
