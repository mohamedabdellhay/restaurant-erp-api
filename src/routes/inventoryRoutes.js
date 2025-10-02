import express from "express";
import groupRoutes from "../utils/groupRoutes.js";
import SupplierController from "../controllers/SupplierController.js";
import IngredientController from "../controllers/IngredientController.js";
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

// ingredients operations
router.group("/ingredients", (route) => {
  // get all ingredients
  route.get("/", IngredientController.index);

  // get ingredient by id
  route.get("/:id", IngredientController.getIngredientById);

  // add new ingredient
  route.post("/", IngredientController.create);

  // update existed ingredient
  route.put("/:id", IngredientController.update);

  // delete an ingredient
  route.delete("/:id", IngredientController.delete);
});

export default router;
