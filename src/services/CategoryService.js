import CategoryModel from "../models/Category.js";

class CategoryService {
  async getAllCategories() {
    return await CategoryModel.find().sort({ name: 1 });
  }

  async getCategoryById(id) {
    return await CategoryModel.findById(id);
  }

  async createCategory(data) {
    return await CategoryModel.create(data);
  }

  async updateCategory(id, data) {
    return await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteCategory(id) {
    return await CategoryModel.findByIdAndDelete(id);
  }
}

export default new CategoryService();
