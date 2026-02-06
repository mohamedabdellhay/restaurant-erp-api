# 🍽️ Restaurant ERP System

A comprehensive Enterprise Resource Planning (ERP) system for restaurant management built with **Node.js**, **Express**, and **MongoDB**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development Progress](#development-progress)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Restaurant ERP is a full-featured management system designed to streamline restaurant operations including staff management, inventory tracking, order processing, table reservations, and comprehensive reporting.

## ✨ Features

### ✅ Implemented Features

- **🔐 Authentication & Authorization**
  - JWT-based secure authentication
  - Password hashing with bcrypt
  - Access & refresh token management
  - Role-based access control (RBAC)
  - Protected routes with middleware
  - Session management with HTTP-only cookies

- **👥 Staff Management**
  - Full CRUD operations for staff members
  - Role assignment (Admin, Manager, Cashier, Chef, Waiter)
  - Account activation/deactivation toggling
  - Profile management & password change

- **🍕 Menu & Category Management**
  - Category creation and management
  - Detailed menu items with pricing, description, and status
  - Availability tracking

- **🪑 Table & Reservation System**
  - Table management (capacity, location, status)
  - Table booking and reservation management
  - Availability checking

- **🛒 Order Management (POS)**
  - Order creation and tracking
  - Order status workflow (Pending, Preparing, Ready, Served, Cancelled)
  - Itemized order details

- **🧾 Invoice & Billing**
  - Automated invoice generation from orders
  - Tax and service charge calculation
  - Payment status tracking (Paid, Unpaid, Partial)

- **📦 Inventory & Supplier Management**
  - Ingredient/Product tracking
  - Supplier management
  - Stock movement logging
  - Low stock monitoring

- **📊 Reports & Analytics**
  - Sales performance reports
  - Inventory status reports
  - Reservation analytics
  - Order volume reporting

- **🔒 Security Features**
  - Helmet.js security headers
  - CORS configuration
  - Rate limiting (100 requests per 15 minutes)
  - Input validation with express-validator
  - XSS & SQL injection protection

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js v5.1.0
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### Security

- **helmet** - Security headers
- **cors** - Cross-Origin Resource Sharing
- **express-rate-limit** - Rate limiting
- **cookie-parser** - Cookie handling

### Documentation

- **swagger-jsdoc** - OpenAPI specification
- **swagger-ui-express** - Interactive API docs

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 6.0
- pnpm or npm package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/restaurant-erp-api.git
cd restaurant-erp-api
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and configure your settings.

4. **Run the application**

```bash
# Development mode
pnpm run dev

# Production mode
pnpm start
```

## 📖 API Documentation

Interactive API documentation is available at:
`http://localhost:3000/api/docs`

## 📁 Project Structure

```
restaurant-erp-api/
├── src/
│   ├── config/             # Configuration files (DB, JWT)
│   ├── controllers/        # Request handlers (Auth, Order, Menu, etc.)
│   ├── middleware/         # Custom middleware (Auth, Validation, Error)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic layer
│   ├── utils/              # Utility functions and Helpers
│   ├── validators/         # Input validation schemas
│   └── app.js              # Express app initialization
├── tests/                  # Test suites
├── server.js               # Main entry point
└── README.md
```

## 📊 Development Progress

### Sprint 1: Authentication & Core Setup ✅ COMPLETE

- [x] JWT configuration & Token utilities
- [x] Auth & Role-based middleware
- [x] Staff model & Password hashing
- [x] Auth API Endpoints (Login, Register, Refresh)
- [x] Security headers & Rate limiting

### Sprint 2: Menu & Table Management ✅ COMPLETE

- [x] Staff Management CRUD
- [x] Category & Menu Item modules
- [x] Table & Reservation modules
- [x] Validation schemas for all modules

### Sprint 3: POS & Invoicing ✅ COMPLETE

- [x] Order management workflow
- [x] Invoice generation & Calculations
- [x] Customer information management

### Sprint 4: Inventory & Suppliers ✅ COMPLETE

- [x] Supplier management
- [x] Inventory items & Stock tracking
- [x] Ingredient management

### Sprint 5: Reports & Analytics ✅ COMPLETE

- [x] Sales & Inventory report generation
- [x] Reservation & Order analytics

### Sprint 6: Final Polish � IN PROGRESS

- [ ] Comprehensive Unit & Integration tests
- [ ] CI/CD pipeline setup
- [ ] Performance optimization

## 🔐 Security Best Practices

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration & refresh logic
- ✅ HTTP-only cookies for token storage
- ✅ Rate limiting & Input validation
- ✅ Security headers with Helmet.js

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Mohamed Abdellhay** - [LinkedIn](https://linkedin.com/in/mohamedabdellhay)

---

**Made with ❤️ for the restaurant industry**
