import express from "express";
import InvoiceController from "../controllers/InvoiceController.js";
const router = express.Router();

// get all invoices
router.get("/", InvoiceController.index);

// get single invoice
router.get("/:id", InvoiceController.getInvoiceById);

// create new invoice
router.post("/", InvoiceController.create);

// update existed invoice
router.put("/:id", InvoiceController.update);

// delete invoice
router.delete("/:id", InvoiceController.delete);

export default router;
