import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    message: "register new user",
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "logged user",
  });
});

router.post("/logout", (req, res) => {
  res.json({
    message: "user logged out",
  });
});

router.get("/me", (req, res) => {
  res.json({
    message: "user data",
  });
});

export default router;
