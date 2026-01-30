import TableModel from "../models/Table.js";
class TableService {
  async getAllTable() {
    const tables = await TableModel.find({});
    return tables;
  }
  async getTableById(_id) {
    const table = await TableModel.findById(_id);
    return table;
  }
  async create(data) {
    const table = await TableModel.insertOne(data);
    return table;
  }
  async update(id, data) {
    const table = await TableModel.findByIdAndUpdate(id, data, { new: true });
    console.log(table);
    return table;
  }

  async delete(id) {
    const table = await TableModel.findByIdAndDelete(id);
    return table;
  }
}

export default new TableService();
