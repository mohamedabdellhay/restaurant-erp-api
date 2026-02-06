import express from "express";
import ReservationController from "../controllers/ReservationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createReservationValidator,
  updateReservationValidator,
  reservationIdValidator,
} from "../validators/reservationValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     description: Retrieve all table bookings. Accessible by Admin and Manager.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get(
  "/",
  protect,
  authorize("admin", "manager"),
  ReservationController.index,
);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     description: Get details of a specific booking.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/:id",
  protect,
  authorize("admin", "manager"),
  reservationIdValidator,
  handleValidationErrors,
  ReservationController.getReservationById,
);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Create a new reservation
 *     description: Book a table for a customer.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createReservationValidator,
  handleValidationErrors,
  ReservationController.create,
);

/**
 * @swagger
 * /reservations/{id}:
 *   patch:
 *     summary: Update a reservation
 *     description: Update status or time of a booking.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateReservationValidator,
  handleValidationErrors,
  ReservationController.update,
);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     description: Cancel and remove a booking.
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  reservationIdValidator,
  handleValidationErrors,
  ReservationController.delete,
);

export default router;
