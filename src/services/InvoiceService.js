import InvoiceModel from "../models/invoice.js";

class InvoiceService {
  async getAllInvoice() {
    const invoices = await InvoiceModel.find();
    return invoices;
  }

  async getInvoiceById(id) {
    const invoice = await InvoiceModel.findById(id);
    return invoice;
  }

  async createInvoice(data) {
    const invoice = await InvoiceModel.insertOne(data);
    return invoice;
  }

  async updateInvoice(id, data) {
    const invoice = await InvoiceModel.findByIdAndUpdate(id, data);
    return invoice;
  }

  async deleteInvoice(id) {
    const invoice = await InvoiceModel.findByIdAndDelete(id);
    return invoice;
  }
}

export default new InvoiceService();
