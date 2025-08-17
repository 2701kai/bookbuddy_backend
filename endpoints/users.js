// endpoints/users.js
// ------------------
// Express router for User CRUD operations

import express from "express";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

const router = express.Router();

function sendError(res, status, message, details) {
  res.status(status).json({ error: message, details });
}

// GET /api/users - List all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    sendError(res, 500, "Failed to fetch users", err.message);
  }
});

// GET /api/users/:id - Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(res, 404, "User not found");
    res.json(user);
  } catch (err) {
    sendError(res, 400, "Invalid user ID", err.message);
  }
});

// POST /api/users - Create a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "Email must be unique");
    } else {
      sendError(res, 500, "Failed to create user", err.message);
    }
  }
});

// PUT /api/users/:id - Update a user completely
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!user) return sendError(res, 404, "User not found");
    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "Email must be unique");
    } else {
      sendError(res, 500, "Failed to update user", err.message);
    }
  }
});

// PATCH /api/users/:id - Partial update
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return sendError(res, 404, "User not found");
    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "Email must be unique");
    } else {
      sendError(res, 500, "Failed to update user", err.message);
    }
  }
});

// DELETE /api/users/:id - Delete a user (only if no open loans)
router.delete("/:id", async (req, res) => {
  try {
    // Check for open loans before deleting
    const openLoans = await Loan.findOne({
      user: req.params.id,
      status: "open",
    });
    if (openLoans)
      return sendError(res, 422, "Cannot delete user with open loans");
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return sendError(res, 404, "User not found");
    res.json({ message: "User deleted" });
  } catch (err) {
    sendError(res, 500, "Failed to delete user", err.message);
  }
});

export default router;
