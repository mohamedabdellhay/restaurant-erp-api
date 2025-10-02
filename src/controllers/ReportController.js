class ReportController {
  async getSales(req, res) {
    res.json({
      message: "sales report",
    });
  }

  async getInventory(req, res) {
    res.json({
      message: "inventory report",
    });
  }

  async getReservations(req, res) {
    res.json({
      message: "reservations report",
    });
  }

  async getOrders(req, res) {
    res.json({
      message: "orders report",
    });
  }
}

export default new ReportController();
