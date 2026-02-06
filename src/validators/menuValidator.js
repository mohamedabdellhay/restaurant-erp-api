import { body, param } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("description").optional().trim(),
  body("image").optional().isURL().withMessage("Invalid image URL"),
];

export const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("isActive").optional().isBoolean(),
];

export const createMenuItemValidator = [
  body("name").notEmpty().withMessage("Item name is required").trim(),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("description").optional().trim(),
  body("image").optional().isURL().withMessage("Invalid image URL"),
];

export const updateMenuItemValidator = [
  param("id").isMongoId().withMessage("Invalid menu item ID"),
  body("name").optional().trim(),
  body("category").optional().isMongoId().withMessage("Invalid category ID"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("isActive").optional().isBoolean(),
];

export const commonIdValidator = [
  param("id").isMongoId().withMessage("Invalid ID"),
];
