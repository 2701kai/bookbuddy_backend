// BookBuddy Backend - Minimal Express Server
// ------------------------------------------
// This file sets up the Express app, loads environment variables, connects to MongoDB,
// and provides a central error handler. All endpoints will be added later.

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookbuddy";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Example root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BookBuddy API!" });
});

// Central error handler (to be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;
