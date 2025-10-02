class IngredientController {
  async index(req, res) {
    res.json({
      message: "get all ingredients",
    });
  }

  async getIngredientById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get single ingredient by id ${id}`,
    });
  }

  async create(req, res) {
    res.json({
      message: "add new ingredient",
    });
  }

  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update existed ingredient by id ${id}`,
    });
  }

  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete an ingredient with id ${id}`,
    });
  }
}

export default new IngredientController();
