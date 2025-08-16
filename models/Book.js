// models/Book.js
// Book model for BookBuddy
// ------------------------
// Represents a book in the library with validation and constraints.

import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 120,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^\d{10}(\d{3})?$/.test(v), // 10 or 13 digits
        message: (props) =>
          `${props.value} is not a valid ISBN (must be 10 or 13 digits)`,
      },
    },
    genres: {
      type: [String],
      validate: [(arr) => arr.length <= 5, "Max 5 genres"],
      default: undefined, // so empty array is not saved
    },
    publishedYear: {
      type: Number,
      min: 1450,
      max: currentYear,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Index for ISBN uniqueness
bookSchema.index({ isbn: 1 }, { unique: true });

export default mongoose.model("Book", bookSchema);
