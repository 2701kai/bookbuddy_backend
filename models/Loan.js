// models/Loan.js
// Loan model for BookBuddy
// ------------------------
// Represents a book loan (borrowing) by a user.

import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loanedAt: {
      type: Date,
      default: Date.now,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["open", "returned", "overdue"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);
