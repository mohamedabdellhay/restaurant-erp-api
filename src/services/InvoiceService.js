import InvoiceModel from "../models/invoice.js";
import OrderModel from "../models/Order.js";

class InvoiceService {
  async getAllInvoices(filter = {}) {
    return await InvoiceModel.find(filter)
      .populate("order", "orderNumber")
      .populate("customer", "name")
      .populate("table", "number")
      .sort({ createdAt: -1 });
  }

  async getInvoiceById(id) {
    return await InvoiceModel.findById(id)
      .populate("order", "orderNumber total status")
      .populate("customer", "name")
      .populate("table", "number")
      .populate("issuedBy", "name")
      .populate("items.product", "name");
  }

  async generateFromOrder(orderId, staffId) {
    const order = await OrderModel.findById(orderId);
    if (!order) throw new Error("Order not found");

    const invoiceItems = order.items.map((item) => ({
      product: item.menuItem,
      quantity: item.qty,
      price: item.price,
      total: item.price * item.qty, // Note: modifiers could be added here
    }));

    const invoiceData = {
      order: orderId,
      customer: order.customer,
      table: order.table,
      items: invoiceItems,
      subTotal: order.subtotal,
      taxPercent: (order.tax / order.subtotal) * 100 || 0,
      serviceChargePercent: (order.serviceCharge / order.subtotal) * 100 || 0,
      grandTotal: order.total,
      paymentMethod: order.payment?.method || "cash",
      paymentStatus: order.status === "paid" ? "paid" : "unpaid",
      issuedBy: staffId,
    };

    return await InvoiceModel.create(invoiceData);
  }

  async updatePaymentStatus(id, status, method) {
    return await InvoiceModel.findByIdAndUpdate(
      id,
      { paymentStatus: status, paymentMethod: method },
      { new: true, runValidators: true },
    );
  }

  async deleteInvoice(id) {
    return await InvoiceModel.findByIdAndDelete(id);
  }
}

export default new InvoiceService();
