class MenuController {
  async index(req, res) {
    res.json({
      message: "get all menus",
    });
  }

  async getMenuItemById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get menu by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "create new menu",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update menu by id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete menu by id ${id}`,
    });
  }
}

export default new MenuController();
