import express from "express";
import ReportController from "../controllers/ReportController.js";
const router = express.Router();

// get sales report
router.get("/sales", ReportController.getSales);

// get inventory report
router.get("/inventory", ReportController.getInventory);

// get reservations report
router.get("/reservations", ReportController.getReservations);

// get orders report
router.get("/orders", ReportController.getOrders);

export default router;
