import Order from "../models/Order.js";
import Invoice from "../models/invoice.js";
import InventoryItem from "../models/InventoryItem.js";
import Customer from "../models/Customer.js";
import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import MenuItem from "../models/MenuItem.js";

class DashboardService {
  /**
   * Get overview metrics for the dashboard
   * @param {String} restaurantId - Restaurant ID
   * @param {String} from - Start date (optional)
   * @param {String} to - End date (optional)
   * @returns {Object} Overview metrics
   */
  async getOverview(restaurantId, from, to) {
    const dateFilter = this._buildDateFilter(from, to);
    const filter = { restaurant: restaurantId, ...dateFilter };

    const [revenue, orders, customers] = await Promise.all([
      // Total revenue from paid orders
      Order.aggregate([
        { $match: { ...filter, status: "paid" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total" },
            averageOrderValue: { $avg: "$total" },
            totalOrders: { $sum: 1 },
          },
        },
      ]),

      // Total orders count
      Order.countDocuments(filter),

      // Total customers
      Customer.countDocuments({ restaurant: restaurantId }),
    ]);

    return {
      totalRevenue: revenue[0]?.totalRevenue || 0,
      averageOrderValue: revenue[0]?.averageOrderValue || 0,
      totalOrders: orders,
      totalCustomers: customers,
      period: { from, to },
    };
  }

  /**
   * Get revenue analytics with trends
   * @param {String} restaurantId - Restaurant ID
   * @param {String} from - Start date
   * @param {String} to - End date
   * @param {String} groupBy - Group by period (day, week, month)
   * @returns {Object} Revenue analytics
   */
  async getRevenueAnalytics(restaurantId, from, to, groupBy = "day") {
    const dateFilter = this._buildDateFilter(from, to);
    const filter = { restaurant: restaurantId, status: "paid", ...dateFilter };

    const groupByFormat = this._getGroupByFormat(groupBy);

    const [trends, paymentMethods, orderTypes] = await Promise.all([
      // Revenue trends over time
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: groupByFormat,
            revenue: { $sum: "$total" },
            orders: { $sum: 1 },
            averageOrderValue: { $avg: "$total" },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Revenue by payment method
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$payment.method",
            revenue: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
      ]),

      // Revenue by order type
      Order.aggregate([
        { $match: filter },
        {
          $group: {
            _id: "$type",
            revenue: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    return {
      trends,
      paymentMethods,
      orderTypes,
      period: { from, to },
    };
  }

  /**
   * Get top selling menu items
   * @param {String} restaurantId - Restaurant ID
   * @param {String} from - Start date (optional)
   * @param {String} to - End date (optional)
   * @param {Number} limit - Number of items to return
   * @returns {Array} Top selling items
   */
  async getTopSellingItems(restaurantId, from, to, limit = 10) {
    const dateFilter = this._buildDateFilter(from, to);
    const filter = { restaurant: restaurantId, ...dateFilter };

    const topItems = await Order.aggregate([
      { $match: filter },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItem",
          totalQuantity: { $sum: "$items.qty" },
          totalRevenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "_id",
          as: "menuItem",
        },
      },
      { $unwind: "$menuItem" },
      {
        $project: {
          _id: 1,
          name: "$menuItem.name",
          image: "$menuItem.image",
          totalQuantity: 1,
          totalRevenue: 1,
          orderCount: 1,
          averagePrice: {
            $cond: {
              if: { $gt: ["$totalQuantity", 0] },
              then: { $divide: ["$totalRevenue", "$totalQuantity"] },
              else: 0,
            },
          },
        },
      },
    ]);

    return topItems;
  }

  /**
   * Get staff performance metrics
   * @param {String} restaurantId - Restaurant ID
   * @param {String} from - Start date (optional)
   * @param {String} to - End date (optional)
   * @returns {Array} Staff performance data
   */
  async getStaffPerformance(restaurantId, from, to) {
    const dateFilter = this._buildDateFilter(from, to);
    const filter = { restaurant: restaurantId, ...dateFilter };

    const staffPerformance = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$createdBy",
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
          averageOrderValue: { $avg: "$total" },
        },
      },
      { $sort: { totalRevenue: -1 } },
      {
        $lookup: {
          from: "staffs",
          localField: "_id",
          foreignField: "_id",
          as: "staff",
        },
      },
      { $unwind: "$staff" },
      {
        $project: {
          _id: 1,
          name: "$staff.name",
          email: "$staff.email",
          role: "$staff.role",
          totalOrders: 1,
          totalRevenue: 1,
          averageOrderValue: 1,
        },
      },
    ]);

    return staffPerformance;
  }

  /**
   * Get customer analytics
   * @param {String} restaurantId - Restaurant ID
   * @param {String} from - Start date (optional)
   * @param {String} to - End date (optional)
   * @returns {Object} Customer analytics
   */
  async getCustomerAnalytics(restaurantId, from, to) {
    const dateFilter = this._buildDateFilter(from, to);

    const [totalCustomers, newCustomers, topCustomers, customerOrders] =
      await Promise.all([
        // Total customers
        Customer.countDocuments({ restaurant: restaurantId }),

        // New customers in period
        Customer.countDocuments({
          restaurant: restaurantId,
          createdAt: dateFilter.createdAt || { $exists: true },
        }),

        // Top customers by revenue
        Order.aggregate([
          {
            $match: {
              restaurant: restaurantId,
              customer: { $exists: true },
              ...dateFilter,
            },
          },
          {
            $group: {
              _id: "$customer",
              totalOrders: { $sum: 1 },
              totalSpent: { $sum: "$total" },
              averageOrderValue: { $avg: "$total" },
            },
          },
          { $sort: { totalSpent: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: "customers",
              localField: "_id",
              foreignField: "_id",
              as: "customer",
            },
          },
          { $unwind: "$customer" },
          {
            $project: {
              _id: 1,
              name: "$customer.name",
              phone: "$customer.phone",
              email: "$customer.email",
              totalOrders: 1,
              totalSpent: 1,
              averageOrderValue: 1,
            },
          },
        ]),

        // Customer order frequency
        Order.aggregate([
          {
            $match: {
              restaurant: restaurantId,
              customer: { $exists: true },
              ...dateFilter,
            },
          },
          {
            $group: {
              _id: "$customer",
              orderCount: { $sum: 1 },
            },
          },
          {
            $group: {
              _id: null,
              averageOrdersPerCustomer: { $avg: "$orderCount" },
              totalCustomersWithOrders: { $sum: 1 },
            },
          },
        ]),
      ]);

    return {
      totalCustomers,
      newCustomers,
      topCustomers,
      averageOrdersPerCustomer:
        customerOrders[0]?.averageOrdersPerCustomer || 0,
      returningCustomers: customerOrders[0]?.totalCustomersWithOrders || 0,
      period: { from, to },
    };
  }

  /**
   * Get real-time metrics for today
   * @param {String} restaurantId - Restaurant ID
   * @returns {Object} Real-time metrics
   */
  async getRealtimeMetrics(restaurantId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayStats, activeOrders, tableOccupancy, pendingReservations] =
      await Promise.all([
        // Today's sales
        Order.aggregate([
          {
            $match: {
              restaurant: restaurantId,
              createdAt: { $gte: today, $lt: tomorrow },
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$total" },
              totalOrders: { $sum: 1 },
              paidOrders: {
                $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] },
              },
            },
          },
        ]),

        // Active orders (not paid or cancelled)
        Order.countDocuments({
          restaurant: restaurantId,
          status: { $nin: ["paid", "cancelled"] },
        }),

        // Table occupancy
        Table.aggregate([
          { $match: { restaurant: restaurantId } },
          {
            $group: {
              _id: null,
              totalTables: { $sum: 1 },
              occupiedTables: {
                $sum: { $cond: [{ $eq: ["$status", "occupied"] }, 1, 0] },
              },
            },
          },
        ]),

        // Pending reservations for today
        Reservation.countDocuments({
          restaurant: restaurantId,
          reservedAt: { $gte: today, $lt: tomorrow },
          status: "pending",
        }),
      ]);

    const stats = todayStats[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      paidOrders: 0,
    };
    const occupancy = tableOccupancy[0] || {
      totalTables: 0,
      occupiedTables: 0,
    };

    return {
      today: {
        revenue: stats.totalRevenue,
        orders: stats.totalOrders,
        paidOrders: stats.paidOrders,
      },
      activeOrders,
      tables: {
        total: occupancy.totalTables,
        occupied: occupancy.occupiedTables,
        available: occupancy.totalTables - occupancy.occupiedTables,
        occupancyRate:
          occupancy.totalTables > 0
            ? (occupancy.occupiedTables / occupancy.totalTables) * 100
            : 0,
      },
      pendingReservations,
      timestamp: new Date(),
    };
  }

  /**
   * Get inventory alerts (low stock items)
   * @param {String} restaurantId - Restaurant ID
   * @returns {Object} Inventory alerts
   */
  async getInventoryAlerts(restaurantId) {
    const [lowStockItems, inventoryValue, totalItems] = await Promise.all([
      // Low stock items
      InventoryItem.find({
        restaurant: restaurantId,
        $expr: { $lte: ["$stock", "$minStockAlert"] },
      })
        .select("name unit stock minStockAlert costPrice")
        .sort({ stock: 1 })
        .limit(20),

      // Total inventory value
      InventoryItem.aggregate([
        { $match: { restaurant: restaurantId } },
        {
          $group: {
            _id: null,
            totalValue: { $sum: { $multiply: ["$stock", "$costPrice"] } },
          },
        },
      ]),

      // Total items count
      InventoryItem.countDocuments({ restaurant: restaurantId }),
    ]);

    return {
      lowStockItems,
      lowStockCount: lowStockItems.length,
      totalInventoryValue: inventoryValue[0]?.totalValue || 0,
      totalItems,
    };
  }

  /**
   * Build date filter for queries
   * @private
   */
  _buildDateFilter(from, to) {
    if (!from && !to) return {};

    const filter = { createdAt: {} };
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);

    return filter;
  }

  /**
   * Get group by format for aggregation
   * @private
   */
  _getGroupByFormat(groupBy) {
    switch (groupBy) {
      case "hour":
        return {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
          hour: { $hour: "$createdAt" },
        };
      case "day":
        return {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        };
      case "week":
        return {
          year: { $year: "$createdAt" },
          week: { $week: "$createdAt" },
        };
      case "month":
        return {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        };
      default:
        return {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        };
    }
  }
}

export default new DashboardService();
