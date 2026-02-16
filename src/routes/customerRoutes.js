import express from "express";
import CustomerController from "../controllers/CustomerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createCustomerValidator,
  updateCustomerValidator,
  customerIdValidator,
  customerSearchValidator,
} from "../validators/customerValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management API
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", authorize("admin", "manager"), CustomerController.index);

/**
 * @swagger
 * /customers/search:
 *   get:
 *     summary: Search customers by name or phone
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query (name or phone)
 *     responses:
 *       200:
 *         description: Search results
 */
router.get(
  "/search",
  customerSearchValidator,
  handleValidationErrors,
  CustomerController.search,
);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *       404:
 *         description: Customer not found
 */
router.get(
  "/:id",
  customerIdValidator,
  handleValidationErrors,
  CustomerController.getCustomerById,
);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Add new customer (scoped to your restaurant)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, phone]
 *             properties:
 *               name: { type: string, example: "John Doe" }
 *               phone: { type: string, example: "1234567890" }
 *               email: { type: string, example: "john@example.com" }
 *               address: { type: string, example: "123 Street, City" }
 *     responses:
 *       201:
 *         description: Customer created
 */
router.post(
  "/",
  createCustomerValidator,
  handleValidationErrors,
  CustomerController.create,
);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               phone: { type: string }
 *               email: { type: string }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.put(
  "/:id",
  updateCustomerValidator,
  handleValidationErrors,
  CustomerController.update,
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted
 */
router.delete(
  "/:id",
  authorize("admin"),
  customerIdValidator,
  handleValidationErrors,
  CustomerController.delete,
);

export default router;
