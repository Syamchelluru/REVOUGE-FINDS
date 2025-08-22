const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Pick port (dynamic for deployment, fallback 5000)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
