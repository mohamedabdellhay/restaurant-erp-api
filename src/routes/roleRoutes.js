import express from "express";
import RoleController from "../controllers/RoleController.js";
const router = express.Router();

// get all roles
router.get("/", RoleController.index);

// create new role
router.post("/", RoleController.create);

// update existed role
router.put("/:id", RoleController.update);

// delete role
router.delete("/:id", RoleController.delete);

// get all permissions
router.get("/permissions", RoleController.getAllPermissions);

export default router;
