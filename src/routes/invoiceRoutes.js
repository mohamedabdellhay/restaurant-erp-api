import express from "express";
const router = express.Router();

// get all invoices
router.get("/", (req, res) => {
  res.json({
    message: "invoice routes",
  });
});

// get single invoice
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get single invoice by id ${id}`,
  });
});

// create new invoice
router.post("/", (req, res) => {
  res.json({
    message: "create new invoice",
  });
});

// update existed invoice
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update existed invoice ${id}`,
  });
});

// delete invoice
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete invoice with id ${id}`,
  });
});

export default router;
