import CategoryService from "../services/CategoryService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import { appendBaseUrlToItems, removeBaseUrlFromItem } from "../utils/urlHelper.js";

class CategoryController {
  index = asyncHandler(async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    const categoriesWithUrl = appendBaseUrlToItems(categories);
    ResponseHandler.success(
      res,
      categoriesWithUrl,
      "Categories retrieved successfully",
    );
  });

  getCategoryById = asyncHandler(async (req, res) => {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    
    const categoryWithUrl = appendBaseUrlToItems(category);
    ResponseHandler.success(res, categoryWithUrl, "Category retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const data = removeBaseUrlFromItem(req.body);
    const category = await CategoryService.createCategory(data);
    const categoryWithUrl = appendBaseUrlToItems(category);
    ResponseHandler.created(res, categoryWithUrl, "Category created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const data = removeBaseUrlFromItem(req.body);
    const category = await CategoryService.updateCategory(
      req.params.id,
      data,
    );
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    
    const categoryWithUrl = appendBaseUrlToItems(category);
    ResponseHandler.success(res, categoryWithUrl, "Category updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const category = await CategoryService.deleteCategory(req.params.id);
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    ResponseHandler.success(res, null, "Category deleted successfully");
  });
}

export default new CategoryController();
