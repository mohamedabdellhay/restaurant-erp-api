class ReservationController {
  async index(req, res) {
    res.json({
      message: "get all reservations",
    });
  }

  async getReservationById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get reservation by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new reservation",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update existed reservation by id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete reservation by id ${id}`,
    });
  }
}

export default new ReservationController();
