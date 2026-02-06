import express from "express";
import TableController from "../controllers/TableController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createTableValidator,
  updateTableValidator,
  tableIdValidator,
} from "../validators/tableValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Get all tables
 *     description: Retrieve a list of all tables in the restaurant. Accessible by all authenticated staff.
 *     tags: [Tables]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tables retrieved successfully
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
 *                     $ref: '#/components/schemas/Table'
 */
router.get("/", protect, TableController.index);

/**
 * @swagger
 * /tables/{id}:
 *   get:
 *     summary: Get table by ID
 *     description: Retrieve detailed information about a specific table.
 *     tags: [Tables]
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
 *         description: Table retrieved successfully
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get(
  "/:id",
  protect,
  tableIdValidator,
  handleValidationErrors,
  TableController.getTableById,
);

/**
 * @swagger
 * /tables:
 *   post:
 *     summary: Create new table
 *     description: Add a new table to the restaurant. Only accessible by Admins.
 *     tags: [Tables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       201:
 *         description: Table created successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  createTableValidator,
  handleValidationErrors,
  TableController.create,
);

/**
 * @swagger
 * /tables/{id}:
 *   patch:
 *     summary: Update table
 *     description: Update table details or status. Only accessible by Admins and Managers.
 *     tags: [Tables]
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
 *             $ref: '#/components/schemas/Table'
 *     responses:
 *       200:
 *         description: Table updated successfully
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */
router.patch(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateTableValidator,
  handleValidationErrors,
  TableController.update,
);

/**
 * @swagger
 * /tables/{id}:
 *   delete:
 *     summary: Delete table
 *     description: Permanently remove a table. Only accessible by Admins.
 *     tags: [Tables]
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
 *         description: Table deleted successfully
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  tableIdValidator,
  handleValidationErrors,
  TableController.delete,
);

export default router;
