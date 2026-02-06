import TableService from "../services/TableService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class TableController {
  index = asyncHandler(async (req, res) => {
    const tables = await TableService.getAllTable();
    ResponseHandler.success(res, tables, "Tables retrieved successfully");
  });

  getTableById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const table = await TableService.getTableById(id);
    if (!table) return ResponseHandler.error(res, "Table not found", 404);
    ResponseHandler.success(res, table, "Table retrieved successfully");
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
    if (!updatedTable)
      return ResponseHandler.error(res, "Table not found", 404);
    ResponseHandler.success(res, updatedTable, "Table updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedTable = await TableService.delete(id);
    if (!deletedTable)
      return ResponseHandler.error(res, "Table not found", 404);
    ResponseHandler.success(res, null, "Table deleted successfully");
  });
}

export default new TableController();
