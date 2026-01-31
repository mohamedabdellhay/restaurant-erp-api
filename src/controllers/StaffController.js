import StaffService from "../services/StaffService.js";
import ResponseHandler from "../utils/responseHandler.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/errors/AppError.js";

class StaffController {
  // Get all employees
  index = asyncHandler(async (req, res) => {
    const staff = await StaffService.getAllStaff();
    ResponseHandler.success(res, staff, "Staff members retrieved successfully");
  });

  // Get employee by ID
  getEmployeeById = asyncHandler(async (req, res) => {
    const staff = await StaffService.getStaffById(req.params.id);
    if (!staff) {
      throw new AppError("Staff member not found", 404);
    }
    ResponseHandler.success(res, staff, "Staff member retrieved successfully");
  });

  // Create new employee
  create = asyncHandler(async (req, res) => {
    const newStaff = await StaffService.createStaff(req.body);
    ResponseHandler.created(res, newStaff, "Staff member created successfully");
  });

  // Update existing employee
  update = asyncHandler(async (req, res) => {
    const updatedStaff = await StaffService.updateStaff(
      req.params.id,
      req.body,
    );
    if (!updatedStaff) {
      throw new AppError("Staff member not found", 404);
    }
    ResponseHandler.success(
      res,
      updatedStaff,
      "Staff member updated successfully",
    );
  });

  // Delete employee
  delete = asyncHandler(async (req, res) => {
    const deletedStaff = await StaffService.deleteStaff(req.params.id);
    if (!deletedStaff) {
      throw new AppError("Staff member not found", 404);
    }
    ResponseHandler.success(res, null, "Staff member deleted successfully");
  });

  // Toggle staff status
  toggleStatus = asyncHandler(async (req, res) => {
    const { isActive } = req.body;
    const staff = await StaffService.toggleStaffStatus(req.params.id, isActive);
    if (!staff) {
      throw new AppError("Staff member not found", 404);
    }
    const statusMsg = isActive ? "activated" : "deactivated";
    ResponseHandler.success(
      res,
      staff,
      `Staff member ${statusMsg} successfully`,
    );
  });
}

export default new StaffController();
