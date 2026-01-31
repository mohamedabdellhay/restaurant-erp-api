import { body, param } from "express-validator";

export const createStaffValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "manager", "cashier", "chef", "waiter"])
    .withMessage("Invalid role"),

  body("restaurant")
    .optional()
    .isMongoId()
    .withMessage("Invalid restaurant ID"),
];

export const updateStaffValidator = [
  param("id").isMongoId().withMessage("Invalid staff ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email").optional().trim().isEmail().withMessage("Invalid email format"),
  body("role")
    .optional()
    .isIn(["admin", "manager", "cashier", "chef", "waiter"])
    .withMessage("Invalid role"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

export const staffIdValidator = [
  param("id").isMongoId().withMessage("Invalid staff ID"),
];
