import DashboardService from "../services/DashboardService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import { appendBaseUrlToItems } from "../utils/urlHelper.js";

class DashboardController {
  /**
   * Get dashboard overview metrics
   * @route GET /api/dashboard/overview
   * @access Private (Admin, Manager)
   */
  getOverview = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    const restaurantId = req.user.restaurant;

    const overview = await DashboardService.getOverview(
      restaurantId,
      from,
      to,
    );

    ResponseHandler.success(
      res,
      overview,
      "Dashboard overview retrieved successfully",
    );
  });

  /**
   * Get revenue analytics with trends
   * @route GET /api/dashboard/revenue
   * @access Private (Admin, Manager)
   */
  getRevenueAnalytics = asyncHandler(async (req, res) => {
    const { from, to, groupBy } = req.query;
    const restaurantId = req.user.restaurant;

    const analytics = await DashboardService.getRevenueAnalytics(
      restaurantId,
      from,
      to,
      groupBy,
    );

    ResponseHandler.success(
      res,
      analytics,
      "Revenue analytics retrieved successfully",
    );
  });

  /**
   * Get top selling menu items
   * @route GET /api/dashboard/top-items
   * @access Private (Admin, Manager)
   */
  getTopSellingItems = asyncHandler(async (req, res) => {
    const { from, to, limit } = req.query;
    const restaurantId = req.user.restaurant;

    const topItems = await DashboardService.getTopSellingItems(
      restaurantId,
      from,
      to,
      parseInt(limit) || 10,
    );

    ResponseHandler.success(
      res,
      appendBaseUrlToItems(topItems),
      "Top selling items retrieved successfully",
    );
  });

  /**
   * Get staff performance metrics
   * @route GET /api/dashboard/staff-performance
   * @access Private (Admin, Manager)
   */
  getStaffPerformance = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    const restaurantId = req.user.restaurant;

    const performance = await DashboardService.getStaffPerformance(
      restaurantId,
      from,
      to,
    );

    ResponseHandler.success(
      res,
      performance,
      "Staff performance retrieved successfully",
    );
  });

  /**
   * Get customer analytics
   * @route GET /api/dashboard/customers
   * @access Private (Admin, Manager)
   */
  getCustomerAnalytics = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    const restaurantId = req.user.restaurant;

    const analytics = await DashboardService.getCustomerAnalytics(
      restaurantId,
      from,
      to,
    );

    ResponseHandler.success(
      res,
      analytics,
      "Customer analytics retrieved successfully",
    );
  });

  /**
   * Get real-time metrics
   * @route GET /api/dashboard/realtime
   * @access Private (Admin, Manager)
   */
  getRealtimeMetrics = asyncHandler(async (req, res) => {
    const restaurantId = req.user.restaurant;

    const metrics = await DashboardService.getRealtimeMetrics(restaurantId);

    ResponseHandler.success(
      res,
      metrics,
      "Real-time metrics retrieved successfully",
    );
  });

  /**
   * Get inventory alerts
   * @route GET /api/dashboard/inventory-alerts
   * @access Private (Admin, Manager)
   */
  getInventoryAlerts = asyncHandler(async (req, res) => {
    const restaurantId = req.user.restaurant;

    const alerts = await DashboardService.getInventoryAlerts(restaurantId);

    ResponseHandler.success(
      res,
      alerts,
      "Inventory alerts retrieved successfully",
    );
  });
}

export default new DashboardController();
