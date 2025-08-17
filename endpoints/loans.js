// endpoints/loans.js
// ------------------
// Express router for Loan CRUD operations and business logic

import express from "express";
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";

const router = express.Router();

function sendError(res, status, message, details) {
  res.status(status).json({ error: message, details });
}

// GET /api/loans - List all loans (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { status, user, book, overdue } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (user) filter.user = user;
    if (book) filter.book = book;
    if (overdue === "true") {
      filter.status = "open";
      filter.dueAt = { $lt: new Date() };
    }
    const loans = await Loan.find(filter)
      .populate({ path: "book", select: "title author isbn" })
      .populate({ path: "user", select: "firstName lastName email" });
    res.json(loans);
  } catch (err) {
    sendError(res, 500, "Failed to fetch loans", err.message);
  }
});

// GET /api/loans/:id - Get a single loan by ID
router.get("/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate({ path: "book", select: "title author isbn" })
      .populate({ path: "user", select: "firstName lastName email" });
    if (!loan) return sendError(res, 404, "Loan not found");
    res.json(loan);
  } catch (err) {
    sendError(res, 400, "Invalid loan ID", err.message);
  }
});

// POST /api/loans - Create a new loan (decrement availableCopies)
router.post("/", async (req, res) => {
  try {
    const { book, user, dueAt } = req.body;
    // Check if book exists and has available copies
    const foundBook = await Book.findById(book);
    if (!foundBook) return sendError(res, 404, "Book not found");
    if (foundBook.availableCopies <= 0)
      return sendError(res, 422, "No available copies for this book");
    // Create loan
    const loan = await Loan.create({ book, user, dueAt });
    // Decrement availableCopies
    foundBook.availableCopies -= 1;
    await foundBook.save();
    res.status(201).json(loan);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else {
      sendError(res, 500, "Failed to create loan", err.message);
    }
  }
});

// PATCH /api/loans/:id/return - Mark loan as returned (increment availableCopies)
router.patch("/:id/return", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return sendError(res, 404, "Loan not found");
    if (loan.status !== "open") return sendError(res, 422, "Loan is not open");
    loan.returnedAt = new Date();
    loan.status = "returned";
    await loan.save();
    // Increment availableCopies
    const book = await Book.findById(loan.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }
    res.json(loan);
  } catch (err) {
    sendError(res, 500, "Failed to return loan", err.message);
  }
});

// DELETE /api/loans/:id - Delete a loan (for admin/testing)
router.delete("/:id", async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return sendError(res, 404, "Loan not found");
    res.json({ message: "Loan deleted" });
  } catch (err) {
    sendError(res, 500, "Failed to delete loan", err.message);
  }
});

export default router;
