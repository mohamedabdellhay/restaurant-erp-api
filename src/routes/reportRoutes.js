import express from "express";
const router = express.Router();

// get sales report
router.get("/sales", (req, res) => {
  res.json({
    message: "sales report",
  });
});

// get inventory report
router.get("/inventory", (req, res) => {
  res.json({
    message: "inventory report",
  });
});

// get reservations report
router.get("/reservations", (req, res) => {
  res.json({
    message: "reservations report",
  });
});

// get orders report
router.get("/orders", (req, res) => {
  res.json({
    message: "orders report",
  });
});
export default router;
