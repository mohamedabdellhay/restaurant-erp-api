import express from "express";
import StaffController from "../controllers/StaffController.js";
const router = express.Router();

// get all employees
router.get("/", StaffController.index);

// get employee by id
router.get("/:id", StaffController.getEmployeeById);

// create new employee
router.post("/", StaffController.create);

// update existing employee
router.put("/:id", StaffController.update);

// delete employee
router.delete("/:id", StaffController.delete);

export default router;
