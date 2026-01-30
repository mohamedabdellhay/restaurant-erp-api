import express from "express";
import TableController from "../controllers/TableController.js";
const router = express.Router();

// get all tables
router.get("/", TableController.index);

//  get table by id
router.get("/:id", TableController.getTableById);

// create new table
router.post("/", TableController.create);

// update table
router.patch("/:id", TableController.update);

// delete table
router.delete("/:id", TableController.delete);

export default router;
