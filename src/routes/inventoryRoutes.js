import express from "express";
import groupRoutes from "../utils/groupRoutes.js";
const router = express.Router();

// Extend Express Router with group method
router.group = groupRoutes;

// Suppliers endpoint
router.group("/suppliers", (route) => {
  // get all suppliers
  route.get("/", (req, res) => {
    res.json({
      message: "get all supplies",
    });
  });

  // create new supplier
  route.post("/", (req, res) => {
    res.json({
      message: "create new supplier",
    });
  });

  // update single supplier
  route.put("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
      message: `update supplier data by id ${id}`,
    });
  });

  // delete supplier
  route.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
      message: `delete supplier by id ${id}`,
    });
  });
});

// ingredients operations
router.group("/ingredients", (route) => {
  // get all ingredients
  route.get("/", (req, res) => {
    res.json({
      message: "get all ingredients",
    });
  });

  // get ingredient by id
  route.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
      message: `get single ingredient by id ${id}`,
    });
  });

  // add new ingredient
  route.post("/", (req, res) => {
    res.json({
      message: "add new ingredient",
    });
  });

  // update existed ingredient
  route.put("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
      message: `update existed ingredient by id ${id}`,
    });
  });

  // delete an ingredient
  route.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
      message: `delete an ingredient with id ${id}`,
    });
  });
});
export default router;
