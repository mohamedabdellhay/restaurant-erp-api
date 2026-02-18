import OrderModel from "../models/Order.js";
import MenuItemModel from "../models/MenuItem.js";
import CustomerModel from "../models/Customer.js";
import RestaurantService from "./RestaurantService.js";

class OrderService {
  async getAllOrders(filter = {}) {
    return await OrderModel.find(filter)
      .populate("table", "number")
      .populate("items.menuItem", "name price")
      .populate("customer", "name phone")
      .sort({ createdAt: -1 });
  }

  async getOrderById(id) {
    return await OrderModel.findById(id)
      .populate("table", "number")
      .populate("items.menuItem", "name price")
      .populate("createdBy", "name")
      .populate("customer", "name");
  }

  async createOrder(data, staffId) {
    const restaurant = await RestaurantService.getCurrent();
    const taxPercent = restaurant?.settings?.taxPercent || 0;
    const serviceChargePercent =
      restaurant?.settings?.serviceChargePercent || 0;

    let subtotal = 0;
    const items = [];

    for (const item of data.items) {
      const menuItem = await MenuItemModel.findById(item.menuItem);
      if (!menuItem) continue;

      const price = menuItem.price;
      const qty = item.qty || 1;
      let modifiersTotal = 0;

      if (item.modifiers && item.modifiers.length > 0) {
        for (const mod of item.modifiers) {
          modifiersTotal += mod.price || 0;
        }
      }

      const itemTotal = (price + modifiersTotal) * qty;
      subtotal += itemTotal;

      items.push({
        menuItem: item.menuItem,
        qty,
        price,
        modifiers: item.modifiers || [],
      });
    }

    const tax = (subtotal * taxPercent) / 100;
    const serviceCharge = (subtotal * serviceChargePercent) / 100;
    const total = subtotal + tax + serviceCharge;

    const orderData = {
      ...data,
      items,
      subtotal,
      tax,
      serviceCharge,
      total,
      createdBy: staffId,
      restaurant: restaurant?._id,
    };

    return await OrderModel.create(orderData);
  }

  async updateOrder(id, data) {
    // If items are updated, we need to recalculate totals
    if (data.items) {
      const restaurant = await RestaurantService.getCurrent();
      const taxPercent = restaurant?.settings?.taxPercent || 0;
      const serviceChargePercent =
        restaurant?.settings?.serviceChargePercent || 0;

      let subtotal = 0;
      for (const item of data.items) {
        const menuItem = await MenuItemModel.findById(item.menuItem);
        if (!menuItem) continue;

        let modifiersTotal = 0;
        if (item.modifiers) {
          item.modifiers.forEach((mod) => (modifiersTotal += mod.price || 0));
        }

        subtotal += (menuItem.price + modifiersTotal) * (item.qty || 1);
      }

      data.subtotal = subtotal;
      data.tax = (subtotal * taxPercent) / 100;
      data.serviceCharge = (subtotal * serviceChargePercent) / 100;
      data.total = data.subtotal + data.tax + data.serviceCharge;
    }

    return await OrderModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteOrder(id) {
    return await OrderModel.findByIdAndDelete(id);
  }

  async searchOrders(query) {
    // 1. Search for matching customers
    const customers = await CustomerModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    }).select("_id");

    const customerIds = customers.map((c) => c._id);

    // 2. Find orders for these customers
    return await OrderModel.find({
      customer: { $in: customerIds },
    })
      .populate("customer", "name phone")
      .populate("table", "number")
      .sort({ createdAt: -1 });
  }
}

export default new OrderService();
