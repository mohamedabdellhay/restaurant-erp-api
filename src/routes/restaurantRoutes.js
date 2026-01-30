import express from "express";
import RestaurantController from "../controllers/RestaurantController.js";
const router = express.Router();

router.get("/", RestaurantController.index);
router.post("/", RestaurantController.create);
router.put("/:id", RestaurantController.update);

export default router;
