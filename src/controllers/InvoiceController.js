import InvoiceService from "../services/InvoiceService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class InvoiceController {
  index = asyncHandler(async (req, res) => {
    const invoices = await InvoiceService.getAllInvoice();
    if (invoices.length === 0) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, invoices);
  });

  getInvoiceById = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.getInvoiceById(req.params.id);
    if (!invoice) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, invoice);
  });

  create = asyncHandler(async (req, res) => {
    const data = await InvoiceService.createInvoice(req.body);
    ResponseHandler.created(res, data, "Invoice Created Successfully");
  });

  update = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.updateInvoice(req.params.id, req.body);
    ResponseHandler.success(res, invoice, "invoice updated successfully");
  });

  async delete(req, res) {
    const invoice = await InvoiceService.deleteInvoice(req.params.id);
    ResponseHandler.success(res, invoice, "invoice deleted successfully");
  }
}

export default new InvoiceController();
