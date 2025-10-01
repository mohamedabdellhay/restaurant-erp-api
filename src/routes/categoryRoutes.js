import express from "express";
const router = express.Router();

// get all categories
router.get("/", (req, res) => {
  res.json({
    message: "get all categories",
  });
});

// get category by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get category by id ${id}`,
  });
});

// create new category
router.post("/", (req, res) => {
  res.json({
    message: `create new category`,
  });
});

// update existed category
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update existed category  id ${id}`,
  });
});

export default router;
