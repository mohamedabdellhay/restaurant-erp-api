import express from "express";
import groupRoutes from "../utils/groupRoutes.js";
import SupplierController from "../controllers/SupplierController.js";
import InventoryItemController from "../controllers/InventoryItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Inventory
 *     description: Inventory and stock management
 *   - name: Suppliers
 *     description: Supplier management operations
 */

// Extend Express Router with group method
router.group = groupRoutes;

// Protect all inventory routes
router.use(protect);

// Suppliers endpoint
router.group("/suppliers", (route) => {
  /**
   * @swagger
   * /inventory/suppliers:
   *   get:
   *     summary: Get all suppliers
   *     tags: [Suppliers]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of suppliers
   */
  route.get("/", SupplierController.index);

  /**
   * @swagger
   * /inventory/suppliers:
   *   post:
   *     summary: Create new supplier
   *     tags: [Suppliers]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Supplier'
   *     responses:
   *       201:
   *         description: Supplier created
   */
  route.post("/", SupplierController.create);

  /**
   * @swagger
   * /inventory/suppliers/{id}:
   *   get:
   *     summary: Get single supplier
   *     tags: [Suppliers]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Supplier details
   */
  route.get("/:id", SupplierController.getSupplierById);

  /**
   * @swagger
   * /inventory/suppliers/{id}:
   *   put:
   *     summary: Update supplier
   *     tags: [Suppliers]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Supplier'
   *     responses:
   *       200:
   *         description: Supplier updated
   */
  route.put("/:id", SupplierController.update);

  /**
   * @swagger
   * /inventory/suppliers/{id}:
   *   delete:
   *     summary: Delete supplier
   *     tags: [Suppliers]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Supplier deleted
   */
  route.delete("/:id", SupplierController.delete);
});

// inventoryItems operations
router.group("/items", (route) => {
  /**
   * @swagger
   * /inventory/items:
   *   get:
   *     summary: Get all inventory items
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of items
   */
  route.get("/", InventoryItemController.index);

  /**
   * @swagger
   * /inventory/items/low-stock:
   *   get:
   *     summary: Get low stock items
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of low stock items
   */
  route.get("/low-stock", InventoryItemController.getLowStock);

  /**
   * @swagger
   * /inventory/items/{id}:
   *   get:
   *     summary: Get inventory item by ID
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item details
   */
  route.get("/:id", InventoryItemController.getIngredientById);

  /**
   * @swagger
   * /inventory/items:
   *   post:
   *     summary: Add new inventory item
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/InventoryItem'
   *     responses:
   *       201:
   *         description: Item added
   */
  route.post("/", InventoryItemController.create);

  /**
   * @swagger
   * /inventory/items/{id}:
   *   put:
   *     summary: Update inventory item
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/InventoryItem'
   *     responses:
   *       200:
   *         description: Item updated
   */
  route.put("/:id", InventoryItemController.update);

  /**
   * @swagger
   * /inventory/items/{id}/stock:
   *   patch:
   *     summary: Update stock level
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               amount: { type: number }
   *               type: { type: string, enum: [addition, deduction] }
   *     responses:
   *       200:
   *         description: Stock updated
   */
  route.patch("/:id/stock", InventoryItemController.updateStock);

  /**
   * @swagger
   * /inventory/items/{id}:
   *   delete:
   *     summary: Delete inventory item
   *     tags: [Inventory]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item deleted
   */
  route.delete("/:id", InventoryItemController.delete);
});

export default router;
