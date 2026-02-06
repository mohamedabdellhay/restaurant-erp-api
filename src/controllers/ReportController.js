import ReportService from "../services/ReportService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class ReportController {
  getSales = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    const sales = await ReportService.getSalesPerformance(from, to);
    ResponseHandler.success(
      res,
      sales[0] || {},
      "Sales report retrieved successfully",
    );
  });

  getInventory = asyncHandler(async (req, res) => {
    const inventory = await ReportService.getInventorySummary();
    ResponseHandler.success(
      res,
      inventory[0] || {},
      "Inventory report retrieved successfully",
    );
  });

  getOrders = asyncHandler(async (req, res) => {
    const { from, to } = req.query;
    const analytics = await ReportService.getOrderAnalytics(from, to);
    ResponseHandler.success(
      res,
      analytics[0] || {},
      "Order analytics retrieved successfully",
    );
  });

  getReservations = asyncHandler(async (req, res) => {
    // Placeholder for now as per current requirements,
    // but could be expanded similar to orders
    ResponseHandler.success(
      res,
      {},
      "Reservations report retrieved successfully",
    );
  });
}

export default new ReportController();
