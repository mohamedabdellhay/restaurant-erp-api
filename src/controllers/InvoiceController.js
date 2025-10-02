class InvoiceController {
  async index(req, res) {
    res.json({
      message: "invoice routes",
    });
  }

  async getInvoiceById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get single invoice by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new invoice",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update existed invoice ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete invoice with id ${id}`,
    });
  }
}

export default new InvoiceController();
