import OrderModel from "../models/Order.js";
import InventoryItemModel from "../models/InventoryItem.js";
import mongoose from "mongoose";

class ReportService {
  async getSalesPerformance(from, to) {
    const filter = {
      status: "paid",
    };

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    return await OrderModel.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          averageOrderValue: { $avg: "$total" },
          totalTax: { $sum: "$tax" },
          totalServiceCharge: { $sum: "$serviceCharge" },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0 } },
    ]);
  }

  async getInventorySummary() {
    return await InventoryItemModel.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          totalStockValue: { $sum: { $multiply: ["$stock", "$costPrice"] } },
          lowStockCount: {
            $sum: {
              $cond: [{ $lte: ["$stock", "$minStockAlert"] }, 1, 0],
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ]);
  }

  async getOrderAnalytics(from, to) {
    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    return await OrderModel.aggregate([
      { $match: filter },
      {
        $facet: {
          statusDistribution: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
          ],
          typeDistribution: [{ $group: { _id: "$type", count: { $sum: 1 } } }],
          hourlyTrends: [
            {
              $group: {
                _id: { $hour: "$createdAt" },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);
  }
}

export default new ReportService();
