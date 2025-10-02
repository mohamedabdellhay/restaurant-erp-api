class TableController {
  async index(req, res) {
    res.json({
      message: "get all tables",
    });
  }

  async getTableById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get table by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new Table",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update able id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete table ${id}`,
    });
  }
}

export default new TableController();
