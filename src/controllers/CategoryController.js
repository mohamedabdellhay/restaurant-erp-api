//class to control category operations
class CategoryController {
  // get all categories
  async index(req, res) {
    res.json({
      message: "get all categories",
    });
  }
  // get category by id
  async getCategoryById(req, res) {
    const id = req.params.id;
    res.json({
      message: `get category by id ${id}`,
    });
  }
  // create new category
  async create(req, res) {
    res.json({
      message: `create new category`,
    });
  }
  // update existed category
  async update(req, res) {
    const id = req.params.id;
    res.json({
      message: `update existed category  id ${id}`,
    });
  }
  // delete category by id
  async delete(req, res) {
    const id = req.params.id;
    res.json({
      message: `delete category with id ${id}`,
    });
  }
}

export default new CategoryController();
