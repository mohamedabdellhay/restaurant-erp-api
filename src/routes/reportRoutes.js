import express from "express";
import ReportController from "../controllers/ReportController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Analytics and reporting operations
 */

// Protect and restrict all report routes to admin and manager
router.use(protect);
router.use(restrictTo("admin", "manager"));

/**
 * @swagger
 * /reports/sales:
 *   get:
 *     summary: Get sales performance report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *         description: Start date
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *         description: End date
 *     responses:
 *       200:
 *         description: Sales summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/SalesReport' }
 */
router.get("/sales", ReportController.getSales);

/**
 * @swagger
 * /reports/inventory:
 *   get:
 *     summary: Get inventory summary report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/InventoryReport' }
 */
router.get("/inventory", ReportController.getInventory);

/**
 * @swagger
 * /reports/reservations:
 *   get:
 *     summary: Get reservations report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservations summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: object }
 */
router.get("/reservations", ReportController.getReservations);

/**
 * @swagger
 * /reports/orders:
 *   get:
 *     summary: Get order analytics report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: to
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Order analytics and trends
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/OrderAnalytics' }
 */
router.get("/orders", ReportController.getOrders);

export default router;
