import express from "express";
import RestaurantController from "../controllers/RestaurantController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createRestaurantValidator,
  updateRestaurantValidator,
  restaurantIdValidator,
} from "../validators/restaurantValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";
import { uploadLogo } from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /restaurant:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieve a list of all restaurants. Only accessible by Admins and Managers.
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of restaurants retrieved successfully
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
 *                     $ref: '#/components/schemas/Restaurant'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get(
  "/",
  protect,
  authorize("admin", "manager"),
  RestaurantController.index,
);

/**
 * @swagger
 * /restaurant/settings:
 *   get:
 *     summary: Get current restaurant settings
 *     description: Retrieve the settings of the current restaurant.
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/settings", protect, RestaurantController.getCurrent);

/**
 * @swagger
 * /restaurant:
 *   post:
 *     summary: Create new restaurant settings
 *     description: Initialize restaurant settings. Only accessible by Admins.
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant settings created successfully
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
  authorize("admin"),
  createRestaurantValidator,
  handleValidationErrors,
  RestaurantController.create,
);

/**
 * @swagger
 * /restaurant/{id}:
 *   put:
 *     summary: Update restaurant settings
 *     description: Update existing restaurant configuration. Only accessible by Admins.
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateRestaurantValidator,
  handleValidationErrors,
  RestaurantController.update,
);

/**
 * @swagger
 * /restaurant/upload-logo:
 *   post:
 *     summary: Upload restaurant logo
 *     description: Upload a logo image for the restaurant. Only accessible by Admins.
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo image file (max 5MB, jpg/jpeg/png/gif/webp)
 *               restaurantId:
 *                 type: string
 *                 description: Restaurant ID (optional, will use authenticated user's restaurant if not provided)
 *     responses:
 *       200:
 *         description: Logo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logo uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     logo:
 *                       type: string
 *                       example: "/uploads/logos/logo-1234567890.png"
 *                     restaurant:
 *                       $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post(
  "/upload-logo",
  protect,
  authorize("admin"),
  uploadLogo.single("logo"),
  RestaurantController.uploadLogo,
);

export default router;
