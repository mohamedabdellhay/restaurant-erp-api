import MenuItemService from "../services/MenuItemService.js";
import ResponseHandler from "../utils/responseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";

class MenuItemController {
  index = asyncHandler(async (req, res) => {
    const menuItems = await MenuItemService.getAllItems();
    if (menuItems.length === 0) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, menuItems);
  });

  getMenuItemById = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.getMenuItemById(req.params.id);
    if (!menuItem) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, menuItem);
  });

  create = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.createMenuItem(req.body);
    ResponseHandler.created(res, menuItem, "item added successfully to menu");
  });

  update = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.updateMenuItem(
      req.params.id,
      req.body
    );
    ResponseHandler.success(res, menuItem, "item updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.deleteMenuItem(req.params.id);
    ResponseHandler.success(res, menuItem, "item deleted successfully");
  });
}

export default new MenuItemController();
