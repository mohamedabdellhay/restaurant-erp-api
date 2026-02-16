import { body, param, query } from "express-validator";

export const createCustomerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Customer name is required")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("phone").notEmpty().withMessage("Phone number is required").trim(),
  body("email").optional().isEmail().withMessage("Invalid email format").trim(),
  body("address")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address cannot exceed 200 characters"),
];

export const updateCustomerValidator = [
  param("id").isMongoId().withMessage("Invalid customer ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("phone").optional().trim(),
  body("email").optional().isEmail().withMessage("Invalid email format").trim(),
  body("address").optional().trim(),
];

export const customerIdValidator = [
  param("id").isMongoId().withMessage("Invalid customer ID"),
];

export const customerSearchValidator = [
  query("q").notEmpty().withMessage("Search query is required").trim(),
];
