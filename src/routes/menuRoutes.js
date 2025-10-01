import express from "express";
const router = express.Router();

// get all menus
router.get("/", (req, res) => {
  res.json({
    message: "get all menus",
  });
});

// get menu by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `get menu by id ${id}`,
  });
});

// create new menu
router.post("/", (req, res) => {
  res.json({
    message: "create new menu",
  });
});

// update single menu
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `update menu by id ${id}`,
  });
});

// delete menu
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete menu by id ${id}`,
  });
});

export default router;
