# BookBuddy Backend

A RESTful API for managing books, users, and loans using Node.js, Express, and MongoDB (Mongoose).

---

## ✍️ Author’s Note

This project is a hands-on learning exercise in building a robust backend with modern Node.js, Express, and Mongoose. The goal is not just to deliver a working API, but to deeply understand best practices, validation, error handling, and the power of using AI as a coding partner.

---

## 🚀 Setup

1. Clone the repo and `cd` into parent directory:
   ```bash
   cd xyz/your-chosen-dir
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and adjust as needed:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

---

## 📚 Mongoose Models

### Book

```js
{
  title: String (required, 2–120 chars),
  author: String (required),
  isbn: String (unique, 10 or 13 digits),
  genres: [String] (max 5),
  publishedYear: Number (1450–current year),
  availableCopies: Number (required, >= 0),
  timestamps: true
}
```

### User

```js
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  memberSince: Date (default: now),
  status: 'active' | 'suspended' (default: 'active'),
  timestamps: true
}
```

### Loan

```js
{
  book: ObjectId → Book (required),
  user: ObjectId → User (required),
  loanedAt: Date (default: now),
  dueAt: Date (required),
  returnedAt: Date (optional),
  status: 'open' | 'returned' | 'overdue' (default: 'open'),
  timestamps: true
}
```

---

## 🧠 Project Philosophy & Learning Goals

- **Validation everywhere:** All fields are validated for type, length, and business rules.
- **Clear error handling:** Consistent error responses for invalid input, not found, and business logic violations.
- **AI as a coding partner:** Every step is explained, and code is commented for learning and future reference.
- **Separation of concerns:** Models, endpoints, and middleware are organized for clarity and maintainability.

---

## 🛠️ Tech Stack

- Node.js, Express, Mongoose, dotenv

---

## 📅 Next Steps

- Implement API endpoints for CRUD operations
- Add business logic for loans and returns
- Centralize error handling and validation
- Seed the database with test data

---

## 📢 Questions or Feedback?

This project is a learning journey—if you spot improvements or want to discuss design decisions, open an issue or reach out!
