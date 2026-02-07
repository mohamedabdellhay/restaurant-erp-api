import { body, param } from "express-validator";

export const createRestaurantValidator = [
  body("name")
    .notEmpty()
    .withMessage("Restaurant name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("address").notEmpty().withMessage("Address is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("website").optional().isURL().withMessage("Invalid website URL"),
  body("currency")
    .optional()
    .isString()
    .withMessage("Currency must be a string"),
  body("settings.taxPercent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax percent must be a positive number"),
  body("settings.serviceChargePercent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Service charge percent must be a positive number"),
  body("settings.theme.primaryColor")
    .optional()
    .isHexColor()
    .withMessage("Primary color must be a valid hex color"),
  body("settings.theme.secondaryColor")
    .optional()
    .isHexColor()
    .withMessage("Secondary color must be a valid hex color"),
  body("settings.theme.accentColor")
    .optional()
    .isHexColor()
    .withMessage("Accent color must be a valid hex color"),
  body("settings.theme.mode")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Mode must be either 'light' or 'dark'"),
];

export const updateRestaurantValidator = [
  param("id").isMongoId().withMessage("Invalid restaurant ID"),
  body("name")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("website").optional().isURL().withMessage("Invalid website URL"),
  body("settings.taxPercent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Tax percent must be a positive number"),
  body("settings.serviceChargePercent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Service charge percent must be a positive number"),
  body("settings.theme.primaryColor")
    .optional()
    .isHexColor()
    .withMessage("Primary color must be a valid hex color"),
  body("settings.theme.secondaryColor")
    .optional()
    .isHexColor()
    .withMessage("Secondary color must be a valid hex color"),
  body("settings.theme.accentColor")
    .optional()
    .isHexColor()
    .withMessage("Accent color must be a valid hex color"),
  body("settings.theme.mode")
    .optional()
    .isIn(["light", "dark"])
    .withMessage("Mode must be either 'light' or 'dark'"),
];

export const restaurantIdValidator = [
  param("id").isMongoId().withMessage("Invalid restaurant ID"),
];
