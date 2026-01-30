import TableService from "../services/TableService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class TableController {
  index = asyncHandler(async (req, res) => {
    const tables = await TableService.getAllTable();
    if (tables.length === 0) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, tables);
  });

  getTableById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const table = await TableService.getTableById(id);
    if (!table) return ResponseHandler.noContent(res);
    ResponseHandler.success(res, table, "success");
  });

  create = asyncHandler(async (req, res) => {
    const data = req.body;
    const table = await TableService.create(data);
    ResponseHandler.created(res, table, "Table added successfully");
  });

  update = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedTable = await TableService.update(id, data);
    if (!updatedTable) return ResponseHandler.noContent(res);
    ResponseHandler.updated(res, updatedTable, "table updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedTable = await TableService.delete(id);
    if (!deletedTable) return ResponseHandler.noContent();
    ResponseHandler.success(
      res,
      deletedTable,
      "Table Deleted Successfully",
      200
    );
  });
}

export default new TableController();
