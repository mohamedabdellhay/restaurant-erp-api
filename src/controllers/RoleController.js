class RoleController {
  async index(req, res) {
    res.json({
      message: "get all roles",
    });
  }

  async create(req, res) {
    res.json({
      message: "create new role",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: "update existed role",
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete role ${id}`,
    });
  }

  async getAllPermissions(req, res) {
    res.json({
      message: "all roles permissions",
    });
  }
}

export default new RoleController();
