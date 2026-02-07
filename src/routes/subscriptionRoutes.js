import express from "express";
import SubscriptionController from "../controllers/SubscriptionController.js";
import { registerSubscriptionValidator } from "../validators/subscriptionValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /subscription/plans:
 *   get:
 *     summary: Get all available plans
 *     description: Retrieve a list of all subscription plans.
 *     tags: [Subscription]
 *     responses:
 *       200:
 *         description: List of plans retrieved successfully
 */
router.get("/plans", SubscriptionController.getPlans);

/**
 * @swagger
 * /subscription/register:
 *   post:
 *     summary: Register a new restaurant with subscription
 *     description: Create a new restaurant, admin user, and pending subscription.
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - restaurantAddress
 *               - restaurantPhone
 *               - adminName
 *               - adminEmail
 *               - adminPassword
 *               - planId
 *             properties:
 *               restaurantName: { type: string }
 *               restaurantAddress: { type: string }
 *               restaurantPhone: { type: string }
 *               restaurantEmail: { type: string, format: email }
 *               adminName: { type: string }
 *               adminEmail: { type: string, format: email }
 *               adminPassword: { type: string }
 *               planId: { type: string }
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already registered
 */
router.post(
  "/register",
  registerSubscriptionValidator,
  handleValidationErrors,
  SubscriptionController.register,
);

/**
 * @swagger
 * /subscription/confirm-payment:
 *   post:
 *     summary: Confirm subscription payment (Manual/Mock)
 *     description: Activate a pending subscription.
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *             properties:
 *               subscriptionId: { type: string }
 *               transactionId: { type: string }
 *     responses:
 *       200:
 *         description: Subscription activated
 */
router.post(
  "/confirm-payment",
  protect,
  authorize("admin"), // Only admin can confirm? Or maybe this should be an internal webhook?
  // For the purpose of this task (User manually paying or system verifying), let's keep it protected.
  // Ideally this would be a webhook from Stripe/etc.
  SubscriptionController.confirmPayment,
);

/**
 * @swagger
 * /subscription/payment/callback:
 *   get:
 *     summary: Kashier Payment Callback
 *     description: Handle redirect from Kashier payment gateway.
 *     tags: [Subscription]
 */
router.get("/payment/callback", SubscriptionController.paymentCallback);

export default router;
