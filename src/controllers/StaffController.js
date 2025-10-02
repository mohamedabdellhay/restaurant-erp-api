class StaffController {
  async index(req, res) {
    res.json({
      message: "all staff",
    });
  }

  async getEmployeeById(req, res) {
    const id = req.params.id;
    res.json({
      message: `employee id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new employee",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update existing employee id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete employee id ${id}`,
    });
  }
}

export default new StaffController();
