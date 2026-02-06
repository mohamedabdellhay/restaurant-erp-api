import MenuItemService from "../services/MenuItemService.js";
import ResponseHandler from "../utils/responseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";

class MenuItemController {
  index = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const menuItems = await MenuItemService.getAllItems(filter);
    ResponseHandler.success(
      res,
      menuItems,
      "Menu items retrieved successfully",
    );
  });

  getMenuItemById = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.getMenuItemById(req.params.id);
    if (!menuItem) return ResponseHandler.error(res, "Item not found", 404);
    ResponseHandler.success(res, menuItem, "Menu item retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.createMenuItem(req.body);
    ResponseHandler.created(res, menuItem, "Menu item created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.updateMenuItem(
      req.params.id,
      req.body,
    );
    if (!menuItem) return ResponseHandler.error(res, "Item not found", 404);
    ResponseHandler.success(res, menuItem, "Menu item updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.deleteMenuItem(req.params.id);
    if (!menuItem) return ResponseHandler.error(res, "Item not found", 404);
    ResponseHandler.success(res, null, "Menu item deleted successfully");
  });
}

export default new MenuItemController();
