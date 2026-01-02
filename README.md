# Production-Grade Authentication System

A secure, production-ready Node.js authentication system built with Express, Neon PostgreSQL, Prisma ORM, and JWT.

## 🚀 Features

- **User Signup**: Register new users with email and password.
- **User Login**: Authenticate users and issue JWT tokens.
- **Forgot Password**: Generate secure reset tokens and send emails via Nodemailer.
- **Reset Password**: Securely reset passwords using tokens.
- **JWT Protection**: Middleware to protect private routes.
- **Clean Architecture**: Separated layers for controllers, services, and utilities.
- **Security**: Password hashing with bcrypt, secure headers with Helmet, and CORS support.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Hashing**: bcryptjs
- **Email**: Nodemailer

## 📁 Project Structure

```text
src/
├── config/           # Environment configuration
├── controllers/      # Request/Response handling
├── middlewares/      # JWT protection & other middlewares
├── prisma/           # Database schema
├── routes/           # API route definitions
├── services/         # Business logic & external integrations
├── utils/            # Reusable helper functions
├── app.js            # Express application setup
└── server.js         # Server entry point
```

## 🚦 Getting Started

### 1. Prerequisites

- Node.js installed
- A PostgreSQL database (e.g., Neon.tech)

### 2. Installation

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```env
PORT=5000
DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_secret"
EMAIL_HOST="smtp.example.com"
EMAIL_USER="your_email"
EMAIL_PASS="your_password"
```

### 4. Database Migration

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Run the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | Register a new user | Public |
| POST | `/api/auth/login` | Login and get token | Public |
| POST | `/api/auth/forgot-password` | Request password reset email | Public |
| POST | `/api/auth/reset-password/:token` | Reset password using token | Public |
| GET | `/api/auth/me` | Get current user profile | Private |

## 🛡️ Security Implementation

- **Passwords**: Hashed using `bcryptjs` with 10 salt rounds.
- **JWT**: Tokens are signed with a secret and have an expiration time.
- **Reset Tokens**: Hashed before being stored in the database (SHA-256).
- **Headers**: `helmet` middleware used to set various security headers.
- **CORS**: Configured to allow cross-origin requests.
