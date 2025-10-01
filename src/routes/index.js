import express from "express";
const router = express.Router();

// import all routes modules
import authRoutes from "./authRoutes.js";
import reportRoutes from "./reportRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import inventoryRoutes from "./inventoryRoutes.js";
import invoiceRoutes from "./invoiceRoutes.js";
import orderRoutes from "./orderRoutes.js";
import menuRoutes from "./menuRoutes.js";
import reservationRoutes from "./reservationRoutes.js";
import tableRoutes from "./tableRoutes.js";
import roleRoutes from "./roleRoutes.js";
import staffRoutes from "./staffRoutes.js";

// mount all routes
router.use("/auth", authRoutes);
router.use("/reports", reportRoutes);
router.use("/categories", categoryRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/orders", orderRoutes);
router.use("/menu", menuRoutes);
router.use("/reservations", reservationRoutes);
router.use("/tables", tableRoutes);
router.use("/roles", roleRoutes);
router.use("/staff", staffRoutes);

export default router;
