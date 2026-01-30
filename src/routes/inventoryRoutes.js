import express from "express";
import groupRoutes from "../utils/groupRoutes.js";
import SupplierController from "../controllers/SupplierController.js";
import InventoryItemController from "../controllers/InventoryItemController.js";
const router = express.Router();

// Extend Express Router with group method
router.group = groupRoutes;

// Suppliers endpoint
router.group("/suppliers", (route) => {
  // get all suppliers
  route.get("/", SupplierController.index);

  // create new supplier
  route.post("/", SupplierController.create);

  // get single supplier
  route.get("/:id", SupplierController.getSupplierById);

  // delete supplier
  route.delete("/:id", SupplierController.delete);

  // update supplier
  route.put("/:id", SupplierController.update);
});

// inventoryItems operations
router.group("/items", (route) => {
  // get all ingredients
  route.get("/", InventoryItemController.index);

  // get ingredient by id
  route.get("/:id", InventoryItemController.getIngredientById);

  // add new ingredient
  route.post("/", InventoryItemController.create);

  // update existed ingredient
  route.put("/:id", InventoryItemController.update);

  // delete an ingredient
  route.delete("/:id", InventoryItemController.delete);
});

export default router;
