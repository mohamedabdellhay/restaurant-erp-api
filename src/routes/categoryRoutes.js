import express from "express";
import categoryController from "../controllers/CategoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
  commonIdValidator,
} from "../validators/menuValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 */
router.get("/", categoryController.index);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 */
router.get(
  "/:id",
  commonIdValidator,
  handleValidationErrors,
  categoryController.getCategoryById,
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createCategoryValidator,
  handleValidationErrors,
  categoryController.create,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.put(
  "/:id",
  protect,
  authorize("admin", "manager"),
  updateCategoryValidator,
  handleValidationErrors,
  categoryController.update,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  commonIdValidator,
  handleValidationErrors,
  categoryController.delete,
);

export default router;
