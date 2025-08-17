# BookBuddy Backend

A RESTful API for managing books, users, and loans using Node.js, Express, and MongoDB (Mongoose).

---

## ✍️ Author’s Note

This project is a hands-on learning exercise in building a robust backend with modern Node.js, Express, and Mongoose. The goal is not just to deliver a working API, but to deeply understand best practices, validation, error handling, and the power of using AI as a coding partner.

---

## 🚀 Setup

1. Clone the repo and `cd` into the server directory:
   ```bash
   cd 0013-16/server
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

## 📚 API Endpoints

### Books

- `GET /api/books` — List all books (supports `?q`, `?genre`, `?year`, `?sort`)
- `GET /api/books/:id` — Get a single book
- `POST /api/books` — Create a new book
- `PUT /api/books/:id` — Update a book completely
- `PATCH /api/books/:id` — Partial update
- `DELETE /api/books/:id` — Delete (only if no open loans)

#### Example: Create Book

```http
POST /api/books
Content-Type: application/json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "availableCopies": 3
}
```

### Users

- `GET /api/users` — List all users
- `GET /api/users/:id` — Get a single user
- `POST /api/users` — Create a new user
- `PUT /api/users/:id` — Update a user completely
- `PATCH /api/users/:id` — Partial update
- `DELETE /api/users/:id` — Delete (only if no open loans)

#### Example: Create User

```http
POST /api/users
Content-Type: application/json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@lovelace.com"
}
```

### Loans

- `GET /api/loans` — List all loans (supports `?status`, `?user`, `?book`, `?overdue=true`)
- `GET /api/loans/:id` — Get a single loan
- `POST /api/loans` — Create a new loan (decrements availableCopies)
- `PATCH /api/loans/:id/return` — Mark as returned (increments availableCopies)
- `DELETE /api/loans/:id` — Delete a loan

#### Example: Create Loan

```http
POST /api/loans
Content-Type: application/json
{
  "book": "<bookId>",
  "user": "<userId>",
  "dueAt": "2024-09-01T00:00:00.000Z"
}
```

#### Example: Return Loan

```http
PATCH /api/loans/1234567890abcdef12345678/return
```

---

## ⚠️ Error Handling & Business Rules

- **400**: Validation errors (invalid fields)
- **404**: Not found (invalid ID or missing resource)
- **409**: Unique constraint (ISBN, email)
- **422**: Business rule violation (e.g., deleting book/user with open loans, loaning when no copies available)
- **500**: Internal server error

All errors return a JSON object:

```json
{
  "error": "Error message",
  "details": "(optional details)"
}
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

- Seed the database with test data
- Add advanced features (filtering, sorting, metrics, soft delete)

---

## 📢 Questions or Feedback?

This project is a learning journey—if you spot improvements or want to discuss design decisions, open an issue or reach out!
