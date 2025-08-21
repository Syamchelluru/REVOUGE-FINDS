const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// Load env vars
dotenv.config();

// Connect DB
connectDB();

// Import address routes
const addressRoutes = require("./modules/address/addressRoutes");

// Use address routes
app.use("/api/address", addressRoutes);

// Pick port (dynamic for deployment, fallback 5000)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});
