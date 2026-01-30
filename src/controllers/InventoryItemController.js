import InventoryItemService from "../services/InventoryItemService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class InventoryItemController {
  index = asyncHandler(async (req, res) => {
    const items = await InventoryItemService.getAllItems();
    if (items.length == 0) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, items, "success");
  });

  getIngredientById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await InventoryItemService.getItemById(id);
    if (!item) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, item, "success");
  });

  create = asyncHandler(async (req, res) => {
    const data = req.body;
    const item = await InventoryItemService.createItem(data);
    ResponseHandler.created(res, item, "item added Successfully");
  });

  update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const item = await InventoryItemService.updateItem(id, data);
    ResponseHandler.created(res, item, "item Updated Successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await InventoryItemService.deleteItem(id);
    ResponseHandler.success(res, item, "item deleted successfully");
  });
}

export default new InventoryItemController();
