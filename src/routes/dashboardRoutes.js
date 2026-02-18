import express from "express";
import DashboardController from "../controllers/DashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Business dashboard and analytics endpoints
 */

// Protect all dashboard routes and restrict to admin and manager
router.use(protect);
router.use(authorize("admin", "manager"));

/**
 * @swagger
 * /dashboard/overview:
 *   get:
 *     summary: Get dashboard overview metrics
 *     description: Returns summary metrics including total revenue, orders, customers, and average order value
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (optional)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (optional)
 *     responses:
 *       200:
 *         description: Overview metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                       example: 125000
 *                     averageOrderValue:
 *                       type: number
 *                       example: 250
 *                     totalOrders:
 *                       type: number
 *                       example: 500
 *                     totalCustomers:
 *                       type: number
 *                       example: 150
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Manager role required
 */
router.get("/overview", DashboardController.getOverview);

/**
 * @swagger
 * /dashboard/revenue:
 *   get:
 *     summary: Get revenue analytics with trends
 *     description: Returns revenue trends over time with breakdown by payment method and order type
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *           enum: [hour, day, week, month]
 *           default: day
 *         description: Group results by time period
 *     responses:
 *       200:
 *         description: Revenue analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     trends:
 *                       type: array
 *                       items:
 *                         type: object
 *                     paymentMethods:
 *                       type: array
 *                       items:
 *                         type: object
 *                     orderTypes:
 *                       type: array
 *                       items:
 *                         type: object
 */
router.get("/revenue", DashboardController.getRevenueAnalytics);

/**
 * @swagger
 * /dashboard/top-items:
 *   get:
 *     summary: Get top selling menu items
 *     description: Returns best-performing menu items by revenue and quantity sold
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (optional)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items to return
 *     responses:
 *       200:
 *         description: Top selling items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       totalQuantity:
 *                         type: number
 *                       totalRevenue:
 *                         type: number
 *                       orderCount:
 *                         type: number
 *                       averagePrice:
 *                         type: number
 */
router.get("/top-items", DashboardController.getTopSellingItems);

/**
 * @swagger
 * /dashboard/staff-performance:
 *   get:
 *     summary: Get staff performance metrics
 *     description: Returns productivity metrics for each staff member
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (optional)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (optional)
 *     responses:
 *       200:
 *         description: Staff performance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       role:
 *                         type: string
 *                       totalOrders:
 *                         type: number
 *                       totalRevenue:
 *                         type: number
 *                       averageOrderValue:
 *                         type: number
 */
router.get("/staff-performance", DashboardController.getStaffPerformance);

/**
 * @swagger
 * /dashboard/customers:
 *   get:
 *     summary: Get customer analytics
 *     description: Returns customer insights including new vs returning customers and top customers
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (optional)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (optional)
 *     responses:
 *       200:
 *         description: Customer analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCustomers:
 *                       type: number
 *                     newCustomers:
 *                       type: number
 *                     returningCustomers:
 *                       type: number
 *                     topCustomers:
 *                       type: array
 *                       items:
 *                         type: object
 *                     averageOrdersPerCustomer:
 *                       type: number
 */
router.get("/customers", DashboardController.getCustomerAnalytics);

/**
 * @swagger
 * /dashboard/realtime:
 *   get:
 *     summary: Get real-time metrics
 *     description: Returns live dashboard data including today's stats and current status
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Real-time metrics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     today:
 *                       type: object
 *                       properties:
 *                         revenue:
 *                           type: number
 *                         orders:
 *                           type: number
 *                         paidOrders:
 *                           type: number
 *                     activeOrders:
 *                       type: number
 *                     tables:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                         occupied:
 *                           type: number
 *                         available:
 *                           type: number
 *                         occupancyRate:
 *                           type: number
 *                     pendingReservations:
 *                       type: number
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
router.get("/realtime", DashboardController.getRealtimeMetrics);

/**
 * @swagger
 * /dashboard/inventory-alerts:
 *   get:
 *     summary: Get inventory alerts
 *     description: Returns low stock items and inventory value summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory alerts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     lowStockItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           stock:
 *                             type: number
 *                           minStockAlert:
 *                             type: number
 *                           unit:
 *                             type: string
 *                     lowStockCount:
 *                       type: number
 *                     totalInventoryValue:
 *                       type: number
 *                     totalItems:
 *                       type: number
 */
router.get("/inventory-alerts", DashboardController.getInventoryAlerts);

export default router;
