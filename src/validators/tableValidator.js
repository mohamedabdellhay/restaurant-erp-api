import { body, param } from "express-validator";

export const createTableValidator = [
  body("number")
    .notEmpty()
    .withMessage("Table number is required")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Table number must be between 1 and 20 characters"),
  body("seats")
    .notEmpty()
    .withMessage("Number of seats is required")
    .isInt({ min: 1 })
    .withMessage("Seats must be a positive integer"),
  body("status")
    .optional()
    .isIn(["available", "occupied", "reserved", "inactive"])
    .withMessage("Invalid table status"),
  body("restaurant")
    .optional()
    .isMongoId()
    .withMessage("Invalid restaurant ID"),
];

export const updateTableValidator = [
  param("id").isMongoId().withMessage("Invalid table ID"),
  body("number")
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Table number must be between 1 and 20 characters"),
  body("seats")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Seats must be a positive integer"),
  body("status")
    .optional()
    .isIn(["available", "occupied", "reserved", "inactive"])
    .withMessage("Invalid table status"),
];

export const tableIdValidator = [
  param("id").isMongoId().withMessage("Invalid table ID"),
];
