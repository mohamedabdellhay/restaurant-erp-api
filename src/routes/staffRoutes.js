import express from "express";
const router = express.Router();

// get all employees
router.get("/", (req, res) => {
  res.json({
    message: "all staff",
  });
});

// get employee by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `employee id ${id}`,
  });
});

// create new employee
router.post("/", (req, res) => {
  res.json({
    message: "create new employee",
  });
});

// update existing employee
router.put("/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: `update existing employee id ${id}`,
  });
});

// delete employee
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    message: `delete employee id ${id}`,
  });
});
export default router;
