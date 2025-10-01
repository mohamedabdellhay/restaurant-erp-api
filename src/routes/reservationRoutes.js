import express from "express";
const router = express.Router();

// get all reservations
router.get("/", (req, res) => {
  res.json({
    message: "get all reservations",
  });
});

// get single reservation by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get reservation by id ${id}`,
  });
});

// create new reservation
router.post("/", (req, res) => {
  res.json({
    message: "create new reservation",
  });
});

// update existed reservation
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update existed reservation by id ${id}`,
  });
});

// delete reservation
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete reservation by id ${id}`,
  });
});

export default router;
