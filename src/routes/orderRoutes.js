import express from "express";
const router = express.Router();

// get all orders
router.get("/", (req, res) => {
  res.json({
    message: "get all orders",
  });
});

// get order by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get order with id ${id}`,
  });
});

// create new order
router.post("/", (req, res) => {
  res.json({
    message: "create new order",
  });
});

// update existed order
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update order by id ${id}`,
  });
});

// delete order
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete order by ${id}`,
  });
});

export default router;
