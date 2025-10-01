import express from "express";
const router = express.Router();

// get all roles
router.get("/", (req, res) => {
  res.json({
    message: "get all roles",
  });
});

// create new role
router.post("/", (req, res) => {
  res.json({
    message: "create new role",
  });
});

// update existed role
router.put("/:id", (req, res) => {
  res.json({
    message: "update existed role",
  });
});

// delete role
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete role ${id}`,
  });
});

// get all permissions
router.get("/permissions", (req, res) => {
  res.json({
    message: "all roles permissions",
  });
});

export default router;
