import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;

// import app routes
import appRoutes from "./routes/index.js";

app.use("/api", appRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: `ERP System Run on port ${PORT}`,
  });
});

export { app, PORT };
