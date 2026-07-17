import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import mongoose from "mongoose";

import connectDB from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

// Load environment variables
dotenv.config();
console.log(
  "MONGODB_URI from server:",
  JSON.stringify(process.env.MONGODB_URI),
);

// ===============================
// Environment Validation
// ===============================
const checkRequiredEnvVars = () => {
  const required = ["MONGODB_URI", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missing.join(", ")}`,
    );
    process.exit(1);
  }
};

// Run environment validation before starting
checkRequiredEnvVars();

// Connect to MongoDB
connectDB();

const app = express();

// ===============================
// Security & Middleware
// ===============================

// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

// MongoDB Injection Protection (Express 5 compatible)
// express-mongo-sanitize tries to reassign req.query which crashes Express 5, so we sanitize in-place:
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.query) mongoSanitize.sanitize(req.query);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// Dynamic CORS configuration for production readiness
const rawFrontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
// Strip trailing slash if the user accidentally included it in their env variable
const frontendUrl = rawFrontendUrl.trim().replace(/\/$/, '');

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g. mobile apps, curl requests),
      // the specific configured frontendUrl,
      // any localhost port during development,
      // and any vercel deployment domain as a fallback.
      if (
        !origin ||
        origin === frontendUrl ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        console.error(`CORS Blocked: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// Request parsing limits to prevent large payload attacks
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Request Logging Improvement based on environment
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // More detailed format for production logs
} else {
  app.use(morgan("dev")); // Concise, colorized format for development
}

// ===============================
// Rate Limiting
// ===============================

// General rate limit: 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});

// Auth rate limit (stricter): 10 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message:
      "Too many auth attempts from this IP, please try again after 15 minutes.",
  },
});

// Apply rate limiters to routes
app.use("/api/", generalLimiter);
app.use("/api/auth/", authLimiter);

// ===============================
// Routes
// ===============================

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Startup CRM Lite Backend API is running...");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// ===============================
// Error Handler
// ===============================
// Must be the last middleware registered
app.use(errorHandler);

// ===============================
// Start Server & Graceful Shutdown
// ===============================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`,
  );
});

// Graceful shutdown handling for containerized/production environments
const gracefulShutdown = () => {
  console.log(
    "\nReceived kill signal (SIGTERM/SIGINT), shutting down gracefully...",
  );

  // Stop accepting new requests
  server.close(async () => {
    console.log("Closed out remaining HTTP connections.");
    try {
      // Close MongoDB connection cleanly
      await mongoose.connection.close();
      console.log("MongoDB connection closed cleanly.");
      process.exit(0);
    } catch (err) {
      console.error("Error during graceful shutdown:", err);
      process.exit(1);
    }
  });

  // Force close after 10 seconds if graceful shutdown hangs
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 10000);
};

// Listen for termination signals (e.g., from Docker, Heroku, Ctrl+C)
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
