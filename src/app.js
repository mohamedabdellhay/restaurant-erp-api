import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import {
  notFoundHandler,
  errorHandler,
} from "./middleware/errorHandlerMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use("/api", limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory with CORS
app.use("/uploads", cors(), express.static("uploads"));

// Import app routes
import appRoutes from "./routes/index.js";

app.use("/api", appRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: `ERP System Running on port ${PORT}`,
  });
});

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

export { app, PORT };
