import CategoryService from "../services/CategoryService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class CategoryController {
  index = asyncHandler(async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    ResponseHandler.success(
      res,
      categories,
      "Categories retrieved successfully",
    );
  });

  getCategoryById = asyncHandler(async (req, res) => {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    ResponseHandler.success(res, category, "Category retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const category = await CategoryService.createCategory(req.body);
    ResponseHandler.created(res, category, "Category created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const category = await CategoryService.updateCategory(
      req.params.id,
      req.body,
    );
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    ResponseHandler.success(res, category, "Category updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const category = await CategoryService.deleteCategory(req.params.id);
    if (!category) return ResponseHandler.error(res, "Category not found", 404);
    ResponseHandler.success(res, null, "Category deleted successfully");
  });
}

export default new CategoryController();
