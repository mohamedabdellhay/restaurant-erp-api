class OrderController {
  async index(req, res) {
    res.json({
      message: "get all orders",
    });
  }

  async getOrderById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get order with id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new order",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update order by id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete order by ${id}`,
    });
  }
}

export default new OrderController();
