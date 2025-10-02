// class to control all inventory operations
class SupplierController {
  async index(req, res) {
    res.json({
      message: "get all supplies",
    });
  }

  async getSupplierById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get supplier data by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new supplier",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update supplier by id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete supplier with id ${id}`,
    });
  }
}

export default new SupplierController();
