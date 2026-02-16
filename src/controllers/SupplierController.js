import SupplierService from "../services/SupplierService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class SupplierController {
  index = asyncHandler(async (req, res) => {
    const suppliers = await SupplierService.getAllSuppliers(
      req.user.restaurant,
    );
    ResponseHandler.success(res, suppliers, "Suppliers retrieved successfully");
  });

  getSupplierById = asyncHandler(async (req, res) => {
    const supplier = await SupplierService.getSupplierById(
      req.params.id,
      req.user.restaurant,
    );
    if (!supplier) {
      return ResponseHandler.error(res, "Supplier not found", 404);
    }
    ResponseHandler.success(res, supplier, "Supplier retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const data = { ...req.body, restaurant: req.user.restaurant };
    const supplier = await SupplierService.createSupplier(data);
    ResponseHandler.created(res, supplier, "Supplier created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const supplier = await SupplierService.updateSupplier(
      req.params.id,
      req.user.restaurant,
      req.body,
    );
    if (!supplier) {
      return ResponseHandler.error(res, "Supplier not found", 404);
    }
    ResponseHandler.success(res, supplier, "Supplier updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const supplier = await SupplierService.deleteSupplier(
      req.params.id,
      req.user.restaurant,
    );
    if (!supplier) {
      return ResponseHandler.error(res, "Supplier not found", 404);
    }
    ResponseHandler.success(res, null, "Supplier deleted successfully");
  });

  addPayment = asyncHandler(async (req, res) => {
    const transaction = await SupplierService.addPayment(
      req.params.id,
      req.user.restaurant,
      req.body,
      req.user._id,
    );
    ResponseHandler.created(res, transaction, "Payment recorded successfully");
  });

  getStatement = asyncHandler(async (req, res) => {
    const statement = await SupplierService.getAccountStatement(
      req.params.id,
      req.user.restaurant,
    );
    ResponseHandler.success(res, statement, "Account statement retrieved");
  });
}

export default new SupplierController();
