import { body, param, query } from "express-validator";

export const createReservationValidator = [
  body("table")
    .notEmpty()
    .withMessage("Table ID is required")
    .isMongoId()
    .withMessage("Invalid table ID"),
  body("customer")
    .notEmpty()
    .withMessage("Customer ID is required")
    .isMongoId()
    .withMessage("Invalid customer ID"),
  body("reservedAt")
    .notEmpty()
    .withMessage("Reservation date and time is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      const date = new Date(value);
      if (date < new Date()) {
        throw new Error("Reservation must be in the future");
      }
      return true;
    }),
  body("numberOfGuests")
    .notEmpty()
    .withMessage("Number of guests is required")
    .isInt({ min: 1 })
    .withMessage("Guests must be at least 1"),
  body("durationMinutes")
    .optional()
    .isInt({ min: 15, max: 480 })
    .withMessage("Duration must be between 15 and 480 minutes"),
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes too long"),
];

export const requestReservationValidator = [
  body("name").notEmpty().withMessage("Name is required").trim(),
  body("phone").notEmpty().withMessage("Phone number is required").trim(),
  body("email").optional().isEmail().withMessage("Invalid email format").trim(),
  body("table").optional().isMongoId().withMessage("Invalid table ID"),
  body("reservedAt")
    .notEmpty()
    .withMessage("Reservation date and time is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      const date = new Date(value);
      if (date < new Date()) {
        throw new Error("Reservation must be in the future");
      }
      return true;
    }),
  body("numberOfGuests")
    .notEmpty()
    .withMessage("Number of guests is required")
    .isInt({ min: 1 })
    .withMessage("Guests must be at least 1"),
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes too long"),
  body("restaurant")
    .notEmpty()
    .withMessage("Restaurant ID is required")
    .isMongoId()
    .withMessage("Invalid restaurant ID"),
];

export const updateReservationValidator = [
  param("id").isMongoId().withMessage("Invalid reservation ID"),
  body("status")
    .optional()
    .isIn(["pending", "confirmed", "cancelled", "completed"])
    .withMessage("Invalid status"),
  body("reservedAt").optional().isISO8601().withMessage("Invalid date format"),
  body("numberOfGuests")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Guests must be at least 1"),
];

export const reservationIdValidator = [
  param("id").isMongoId().withMessage("Invalid reservation ID"),
];
