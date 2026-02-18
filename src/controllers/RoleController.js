import ResponseHandler from "../utils/responseHandler.js";

class RoleController {
  async index(req, res) {
    ResponseHandler.success(res, null, "Roles retrieved successfully");
  }

  async create(req, res) {
    ResponseHandler.created(res, null, "Role created successfully");
  }

  async update(req, res) {
    const id = req.params.id;
    ResponseHandler.updated(res, null, "Role updated successfully");
  }

  async delete(req, res) {
    const id = req.params.id;
    ResponseHandler.success(res, null, "Role deleted successfully");
  }

  async getAllPermissions(req, res) {
    ResponseHandler.success(res, null, "Permissions retrieved successfully");
  }
}

export default new RoleController();
