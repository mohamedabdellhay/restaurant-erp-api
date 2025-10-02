import express from "express";
import ReservationController from "../controllers/ReservationController.js";
const router = express.Router();

// get all reservations
router.get("/", ReservationController.index);

// get single reservation by id
router.get("/:id", ReservationController.getReservationById);

// create new reservation
router.post("/", ReservationController.create);

// update existed reservation
router.put("/:id", ReservationController.update);

// delete reservation
router.delete("/:id", ReservationController.delete);

export default router;
