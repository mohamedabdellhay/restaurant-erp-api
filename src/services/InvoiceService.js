import InvoiceModel from "../models/invoice.js";
import OrderModel from "../models/Order.js";
import PDFDocument from "pdfkit";

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

  async generateInvoicePDF(invoiceId) {
    const invoice = await InvoiceModel.findById(invoiceId)
      .populate("order")
      .populate("customer")
      .populate("table")
      .populate("issuedBy");

    if (!invoice) throw new Error("Invoice not found");

    const doc = new PDFDocument({ margin: 50 });

    // Header
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("RESTAURANT INVOICE", 110, 57)
      .fontSize(10)
      .text(`Invoice #: ${invoice._id}`, 200, 65, { align: "right" })
      .text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 200, 80, {
        align: "right",
      })
      .moveDown();

    // Line under header
    doc.moveTo(50, 100).lineTo(550, 100).stroke();

    // Customer / Table Info
    doc
      .fontSize(12)
      .text("Order Information", 50, 115)
      .fontSize(10)
      .text(`Order #: ${invoice.order?.orderNumber || "N/A"}`, 50, 130)
      .text(`Table: ${invoice.table?.number || "N/A"}`, 50, 145)
      .text(`Customer: ${invoice.customer?.name || "Guest"}`, 50, 160)
      .text(`Staff: ${invoice.issuedBy?.name || "N/A"}`, 50, 175);

    // Items Header
    let y = 210;
    doc
      .fontSize(10)
      .text("Item", 50, y)
      .text("Qty", 280, y, { width: 30, align: "right" })
      .text("Price", 350, y, { width: 60, align: "right" })
      .text("Total", 450, y, { width: 100, align: "right" });

    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();
    y += 25;

    // Items
    invoice.items.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.product?.name || "Product", 50, y)
        .text(item.quantity.toString(), 280, y, { width: 30, align: "right" })
        .text(item.price.toFixed(2), 350, y, { width: 60, align: "right" })
        .text(item.total.toFixed(2), 450, y, { width: 100, align: "right" });
      y += 20;
    });

    // Summary
    y += 20;
    doc.moveTo(350, y).lineTo(550, y).stroke();
    y += 10;

    doc
      .fontSize(10)
      .text("Subtotal:", 350, y)
      .text(invoice.subTotal.toFixed(2), 450, y, { align: "right" });
    y += 20;

    if (invoice.taxPercent) {
      doc
        .text(`Tax (${invoice.taxPercent}%):`, 350, y)
        .text((invoice.subTotal * (invoice.taxPercent / 100)).toFixed(2), 450, y, {
          align: "right",
        });
      y += 20;
    }

    if (invoice.serviceChargePercent) {
      doc
        .text(`Service (${invoice.serviceChargePercent}%):`, 350, y)
        .text(
          (invoice.subTotal * (invoice.serviceChargePercent / 100)).toFixed(2),
          450,
          y,
          { align: "right" },
        );
      y += 20;
    }

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Grand Total:", 350, y)
      .text(invoice.grandTotal.toFixed(2), 450, y, { align: "right" });

    // Footer
    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Thank you for your business!", 50, 700, {
        align: "center",
        width: 500,
      });

    doc.end();
    return doc;
  }
}

export default new InvoiceService();
