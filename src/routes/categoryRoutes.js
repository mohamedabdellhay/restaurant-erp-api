import express from "express";
import categoryController from "../controllers/CategoryController.js";
const router = express.Router();

// get all categories
router.get("/", categoryController.index);

// get category by id
router.get("/:id", categoryController.getCategoryById);

// create new category
router.post("/", categoryController.create);

// update existed category
router.put("/:id", categoryController.update);

// delete category by id
router.delete("/:id", categoryController.delete);

export default router;
