import CustomerService from "../services/CustomerService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class CustomerController {
  index = asyncHandler(async (req, res) => {
    const customers = await CustomerService.getAll(req.user.restaurant);
    ResponseHandler.success(res, customers, "Customers retrieved successfully");
  });

  getCustomerById = asyncHandler(async (req, res) => {
    const customer = await CustomerService.getById(
      req.params.id,
      req.user.restaurant,
    );
    if (!customer) return ResponseHandler.error(res, "Customer not found", 404);
    ResponseHandler.success(res, customer, "Customer retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const data = { ...req.body, restaurant: req.user.restaurant };
    const customer = await CustomerService.create(data);
    ResponseHandler.created(res, customer, "Customer created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const customer = await CustomerService.update(
      req.params.id,
      req.user.restaurant,
      req.body,
    );
    if (!customer) return ResponseHandler.error(res, "Customer not found", 404);
    ResponseHandler.success(res, customer, "Customer updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const customer = await CustomerService.delete(
      req.params.id,
      req.user.restaurant,
    );
    if (!customer) return ResponseHandler.error(res, "Customer not found", 404);
    ResponseHandler.success(res, null, "Customer deleted successfully");
  });

  search = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const customers = await CustomerService.search(q, req.user.restaurant);
    ResponseHandler.success(
      res,
      customers,
      "Search results retrieved successfully",
    );
  });
}

export default new CustomerController();
