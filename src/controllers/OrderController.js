import OrderService from "../services/OrderService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class OrderController {
  index = asyncHandler(async (req, res) => {
    const orders = await OrderService.getAllOrders();
    ResponseHandler.success(res, orders, "Orders retrieved successfully");
  });

  getOrderById = asyncHandler(async (req, res) => {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) {
      return ResponseHandler.error(res, "Order not found", 404);
    }
    ResponseHandler.success(res, order, "Order retrieved successfully");
  });

  create = asyncHandler(async (req, res) => {
    const order = await OrderService.createOrder(req.body, req.user._id);
    ResponseHandler.created(res, order, "Order created successfully");
  });

  update = asyncHandler(async (req, res) => {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    if (!order) {
      return ResponseHandler.error(res, "Order not found", 404);
    }
    ResponseHandler.success(res, order, "Order updated successfully");
  });

  delete = asyncHandler(async (req, res) => {
    const order = await OrderService.deleteOrder(req.params.id);
    if (!order) {
      return ResponseHandler.error(res, "Order not found", 404);
    }
    ResponseHandler.success(res, null, "Order deleted successfully");
  });
}

export default new OrderController();
