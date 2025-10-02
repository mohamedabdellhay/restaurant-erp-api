import express from "express";
import OrderController from "../controllers/OrderController.js";
const router = express.Router();

// get all orders
router.get("/", OrderController.index);

// get order by id
router.get("/:id", OrderController.getOrderById);

// create new order
router.post("/", OrderController.create);

// update existed order
router.put("/:id", OrderController.update);

// delete order
router.delete("/:id", OrderController.delete);

export default router;
