// endpoints/books.js
// ------------------
// Express router for Book CRUD operations
// Import Book model and define RESTful routes

import express from "express";

const router = express.Router();

// GET /api/books - List all books
router.get("/", async (req, res) => {
  // TODO: Implement list with filtering, sorting, etc.
  res.json({ message: "List all books" });
});

// GET /api/books/:id - Get a single book by ID
router.get("/:id", async (req, res) => {
  // TODO: Implement get by ID
  res.json({ message: `Get book with ID ${req.params.id}` });
});

// POST /api/books - Create a new book
router.post("/", async (req, res) => {
  // TODO: Implement create
  res.json({ message: "Create a new book" });
});

// PUT /api/books/:id - Update a book completely
router.put("/:id", async (req, res) => {
  // TODO: Implement full update
  res.json({ message: `Update book with ID ${req.params.id}` });
});

// PATCH /api/books/:id - Partial update
router.patch("/:id", async (req, res) => {
  // TODO: Implement partial update
  res.json({ message: `Partially update book with ID ${req.params.id}` });
});

// DELETE /api/books/:id - Delete a book
router.delete("/:id", async (req, res) => {
  // TODO: Implement delete (only if no open loans)
  res.json({ message: `Delete book with ID ${req.params.id}` });
});

export default router;
