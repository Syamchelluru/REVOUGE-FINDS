const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// Logging middleware (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS setup (use frontend URL from environment)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parser with larger limit (for images, etc.)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
const authRoutes = require("./modules/auth/authRoutes");
const addressRoutes = require("./modules/address/addressRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API running...");
});

module.exports = app;
