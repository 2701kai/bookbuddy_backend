// endpoints/books.js
// ------------------
// Express router for Book CRUD operations
// Import Book model and define RESTful routes

import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Helper: send consistent error responses
function sendError(res, status, message, details) {
  res.status(status).json({ error: message, details });
}

// GET /api/books - List all books (with optional filters)
router.get("/", async (req, res) => {
  try {
    // Basic filtering and sorting (expand as needed)
    const { q, genre, year, sort } = req.query;
    let filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };
    if (genre) filter.genres = genre;
    if (year) filter.publishedYear = Number(year);
    let query = Book.find(filter);
    if (sort) query = query.sort(sort.replace(/,/g, " "));
    const books = await query.exec();
    res.json(books);
  } catch (err) {
    sendError(res, 500, "Failed to fetch books", err.message);
  }
});

// GET /api/books/:id - Get a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return sendError(res, 404, "Book not found");
    res.json(book);
  } catch (err) {
    sendError(res, 400, "Invalid book ID", err.message);
  }
});

// POST /api/books - Create a new book
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "ISBN must be unique");
    } else {
      sendError(res, 500, "Failed to create book", err.message);
    }
  }
});

// PUT /api/books/:id - Update a book completely
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!book) return sendError(res, 404, "Book not found");
    res.json(book);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "ISBN must be unique");
    } else {
      sendError(res, 500, "Failed to update book", err.message);
    }
  }
});

// PATCH /api/books/:id - Partial update
router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return sendError(res, 404, "Book not found");
    res.json(book);
  } catch (err) {
    if (err.name === "ValidationError") {
      sendError(res, 400, "Validation error", err.errors);
    } else if (err.code === 11000) {
      sendError(res, 409, "ISBN must be unique");
    } else {
      sendError(res, 500, "Failed to update book", err.message);
    }
  }
});

// DELETE /api/books/:id - Delete a book (only if no open loans)
router.delete("/:id", async (req, res) => {
  try {
    // TODO: Check for open loans before deleting (requires Loan model)
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return sendError(res, 404, "Book not found");
    res.json({ message: "Book deleted" });
  } catch (err) {
    sendError(res, 500, "Failed to delete book", err.message);
  }
});

export default router;
