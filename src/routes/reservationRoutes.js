import express from "express";
import ReservationController from "../controllers/ReservationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createReservationValidator,
  requestReservationValidator,
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
 *         description: List of reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table
 *               - reservedAt
 *               - numberOfGuests
 *             properties:
 *               table:
 *                 type: string
 *                 example: "697c64236af7d7011759f9b5"
 *               reservedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-02-07T19:00:00Z"
 *               numberOfGuests:
 *                 type: number
 *                 example: 4
 *               durationMinutes:
 *                 type: number
 *                 default: 90
 *               customer:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
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
 * /reservations/request:
 *   post:
 *     summary: Request a new reservation (Guest)
 *     description: Submit a reservation request without an immediate table assignment. Accessible by guests.
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - reservedAt
 *               - numberOfGuests
 *               - restaurant
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               table:
 *                 type: string
 *                 example: "697c64236af7d7011759f9b5"
 *                 description: "Optional Table ID"
 *               reservedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-02-07T19:00:00Z"
 *               numberOfGuests:
 *                 type: number
 *                 example: 4
 *               notes:
 *                 type: string
 *                 example: "Table near window"
 *               restaurant:
 *                 type: string
 *                 example: "697c64236af7d7011759f9b2"
 *                 description: "Restaurant ID (Required)"
 *     responses:
 *       201:
 *         description: Reservation request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post(
  "/request",
  requestReservationValidator,
  handleValidationErrors,
  ReservationController.request,
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservedAt:
 *                 type: string
 *                 format: date-time
 *               numberOfGuests:
 *                 type: number
 *               durationMinutes:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: ["pending", "confirmed", "cancelled", "completed"]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
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
