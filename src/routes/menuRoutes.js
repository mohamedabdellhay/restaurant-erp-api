import express from "express";
import MenuItemController from "../controllers/MenuItemController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createMenuItemValidator,
  updateMenuItemValidator,
  commonIdValidator,
} from "../validators/menuValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 */
router.get("/", MenuItemController.index);

/**
 * @swagger
 * /menu/{id}:
 *   get:
 *     summary: Get menu item by ID
 *     tags: [Menu]
 */
router.get(
  "/:id",
  commonIdValidator,
  handleValidationErrors,
  MenuItemController.getMenuItemById,
);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createMenuItemValidator,
  handleValidationErrors,
  MenuItemController.create,
);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateMenuItemValidator,
  handleValidationErrors,
  MenuItemController.update,
);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  commonIdValidator,
  handleValidationErrors,
  MenuItemController.delete,
);

export default router;
