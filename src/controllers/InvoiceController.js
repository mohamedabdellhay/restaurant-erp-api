import InvoiceService from "../services/InvoiceService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class InvoiceController {
  index = asyncHandler(async (req, res) => {
    const invoices = await InvoiceService.getAllInvoices();
    ResponseHandler.success(res, invoices, "Invoices retrieved successfully");
  });

  getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.getInvoiceById(req.params.id);
    if (!invoice) {
      return ResponseHandler.error(res, "Invoice not found", 404);
    }
    ResponseHandler.success(res, invoice, "Invoice retrieved successfully");
  });

  // Create invoice from an order
  createFromOrder = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.generateFromOrder(
      req.body.orderId,
      req.user._id,
    );
    ResponseHandler.created(res, invoice, "Invoice generated successfully");
  });

  updateStatus = asyncHandler(async (req, res) => {
    const { status, method } = req.body;
    const invoice = await InvoiceService.updatePaymentStatus(
      req.params.id,
      status,
      method,
    );
    if (!invoice) {
      return ResponseHandler.error(res, "Invoice not found", 404);
    }
    ResponseHandler.success(
      res,
      invoice,
      "Invoice status updated successfully",
    );
  });

  delete = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.deleteInvoice(req.params.id);
    if (!invoice) {
      return ResponseHandler.error(res, "Invoice not found", 404);
    }
    ResponseHandler.success(res, null, "Invoice deleted successfully");
  });
}

export default new InvoiceController();
