import express from "express";
import MenuController from "../controllers/MenuController.js";
const router = express.Router();

// get all menus
router.get("/", MenuController.index);

// get menu by id
router.get("/:id", MenuController.getMenuItemById);

// create new menu
router.post("/", MenuController.create);

// update single menu
router.put("/:id", MenuController.update);

// delete menu
router.delete("/:id", MenuController.delete);

export default router;
