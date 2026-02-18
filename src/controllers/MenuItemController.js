import MenuItemService from "../services/MenuItemService.js";
import ResponseHandler from "../utils/responseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";
import { appendBaseUrlToItems, removeBaseUrlFromItem } from "../utils/urlHelper.js";

class MenuItemController {
  index = asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const menuItems = await MenuItemService.getAllItems(filter);
    const menuItemsWithUrl = appendBaseUrlToItems(menuItems);

    ResponseHandler.success(
      res,
      menuItemsWithUrl,
      "Menu items retrieved successfully",
    );
  });

  getMenuItemById = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.getMenuItemById(req.params.id);
    if (!menuItem) return ResponseHandler.error(res, "Item not found", 404);
    
    const menuItemWithUrl = appendBaseUrlToItems(menuItem);
    ResponseHandler.success(res, menuItemWithUrl, "Menu item retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const data = removeBaseUrlFromItem(req.body);
    const menuItem = await MenuItemService.createMenuItem(data);
    const menuItemWithUrl = appendBaseUrlToItems(menuItem);
    ResponseHandler.created(res, menuItemWithUrl, "Menu item created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const data = removeBaseUrlFromItem(req.body);
    const menuItem = await MenuItemService.updateMenuItem(
      req.params.id,
      data,
    );
    if (!menuItem) return ResponseHandler.error(res, "Item find not found", 404);
    
    const menuItemWithUrl = appendBaseUrlToItems(menuItem);
    ResponseHandler.success(res, menuItemWithUrl, "Menu item updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const menuItem = await MenuItemService.deleteMenuItem(req.params.id);
    if (!menuItem) return ResponseHandler.error(res, "Item not found", 404);
    ResponseHandler.success(res, null, "Menu item deleted successfully");
  });
}

export default new MenuItemController();
