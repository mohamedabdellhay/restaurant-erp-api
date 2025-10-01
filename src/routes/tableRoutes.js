import express from "express";
const router = express.Router();

// get all tables
router.get("/", (req, res) => {
  res.json({
    message: "get all tables",
  });
});

//  get table by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get table by id ${id}`,
  });
});

// create new table
router.post("/", (req, res) => {
  res.json({
    message: "create new Table",
  });
});

// update table
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update able id ${id}`,
  });
});

// delete table
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: `delete table ${id}`,
  });
});

export default router;
