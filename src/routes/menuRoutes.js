import express from "express";
import MenuItemController from "../controllers/MenuItemController.js";
const router = express.Router();

// get all menus
router.get("/", MenuItemController.index);

// get menu by id
router.get("/:id", MenuItemController.getMenuItemById);

// create new menu
router.post("/", MenuItemController.create);

// update single menu
router.put("/:id", MenuItemController.update);

// delete menu
router.delete("/:id", MenuItemController.delete);

export default router;
