import express from "express";
import StaffController from "../controllers/StaffController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import {
  createStaffValidator,
  updateStaffValidator,
  staffIdValidator,
} from "../validators/staffValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

// All staff routes are protected
router.use(protect);

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members. Only accessible by Admins and Managers.
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of staff members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Staff members retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Staff'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get("/", authorize("admin", "manager"), StaffController.index);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Get staff member by ID
 *     description: Retrieve detailed information about a specific staff member by their ID. Accessible by Admins and Managers.
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The staff member ID
 *     responses:
 *       200:
 *         description: Staff member retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Staff member retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get(
  "/:id",
  authorize("admin", "manager"),
  staffIdValidator,
  handleValidationErrors,
  StaffController.getEmployeeById,
);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Create new staff member
 *     description: Add a new staff member to the system. Only accessible by Admins.
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.smith@restaurant.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "SecurePass123!"
 *               role:
 *                 type: string
 *                 enum: [admin, manager, cashier, chef, waiter]
 *                 example: "waiter"
 *               restaurant:
 *                 type: string
 *                 example: "697c64236af7d7011759f9b4"
 *     responses:
 *       201:
 *         description: Staff member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Staff member created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post(
  "/",
  authorize("admin"),
  createStaffValidator,
  handleValidationErrors,
  StaffController.create,
);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update staff member
 *     description: Update the details of an existing staff member. Only accessible by Admins.
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *                 enum: [admin, manager, cashier, chef, waiter]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Staff member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put(
  "/:id",
  authorize("admin"),
  updateStaffValidator,
  handleValidationErrors,
  StaffController.update,
);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete staff member
 *     description: Permanently remove a staff member from the system. Only accessible by Admins.
 *     tags: [Staff]
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
 *         description: Staff member deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete(
  "/:id",
  authorize("admin"),
  staffIdValidator,
  handleValidationErrors,
  StaffController.delete,
);

/**
 * @swagger
 * /staff/{id}/toggle-status:
 *   patch:
 *     summary: Toggle staff active status
 *     description: Activate or deactivate a staff member's account. Only accessible by Admins.
 *     tags: [Staff]
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
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch(
  "/:id/toggle-status",
  authorize("admin"),
  staffIdValidator,
  handleValidationErrors,
  StaffController.toggleStatus,
);

export default router;
