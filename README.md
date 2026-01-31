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
  - Password hashing with bcrypt (12 salt rounds)
  - Access & refresh token management
  - Role-based access control (RBAC)
  - Protected routes with middleware
  - Session management with HTTP-only cookies

- **👥 Staff Management**
  - User registration and login
  - Profile management
  - Password change functionality
  - Role assignment (Admin, Manager, Cashier, Chef, Waiter)
  - Account activation/deactivation

- **🔒 Security Features**
  - Helmet.js security headers
  - CORS configuration
  - Rate limiting (100 requests per 15 minutes)
  - Input validation with express-validator
  - SQL injection protection
  - XSS protection

- **📚 API Documentation**
  - Comprehensive Swagger/OpenAPI documentation
  - Interactive API testing interface
  - Detailed request/response schemas
  - Authentication examples

### 🚧 In Progress

- **🍕 Menu Management**
  - Categories and menu items
  - Recipe management
  - Pricing and availability

- **🪑 Table Management**
  - Table status tracking
  - Seating capacity management
  - Table assignment

- **📅 Reservation System**
  - Table booking
  - Reservation management
  - Availability checking

### 📅 Planned Features

- **🛒 Order Management (POS)**
  - Order creation and tracking
  - Order status workflow
  - Kitchen display integration

- **🧾 Invoice System**
  - Automated invoice generation
  - Tax and service charge calculation
  - Payment processing
  - Discount management

- **📦 Inventory Management**
  - Stock tracking
  - Low stock alerts
  - Supplier management
  - Purchase orders

- **📊 Reports & Analytics**
  - Sales reports
  - Inventory reports
  - Staff performance metrics
  - Revenue analytics

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

### Development

- **nodemon** - Auto-restart on file changes
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 6.0
- npm or pnpm package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/restaurant-erp-api.git
cd restaurant-erp-api
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:

```env
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/restaurant_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_this_in_production
JWT_REFRESH_EXPIRES_IN=30d

# Security
BCRYPT_SALT_ROUNDS=12
```

4. **Start MongoDB**

```bash
# Make sure MongoDB is running
sudo systemctl start mongod
# or
mongod
```

5. **Run the application**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6. **Access the application**

- API: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/api/docs`

## 📖 API Documentation

### Swagger UI

Interactive API documentation is available at:

```
http://localhost:3000/api/docs
```

### Authentication Endpoints

#### Register New Staff

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@restaurant.com",
  "password": "Password123!",
  "role": "cashier"
}
```

#### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@restaurant.com",
  "password": "Password123!"
}
```

#### Get Profile (Protected)

```bash
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Change Password (Protected)

```bash
PUT /api/auth/change-password
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword123!"
}
```

### Testing with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@restaurant.com","password":"Admin123!","role":"admin"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@restaurant.com","password":"Admin123!"}'

# Get Profile
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure

```
restaurant-erp-api/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── jwt.js             # JWT configuration
│   ├── controllers/
│   │   ├── AuthController.js  # ✅ Authentication logic
│   │   ├── OrderController.js # 🚧 Order management
│   │   ├── MenuItemController.js
│   │   ├── TableController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── authMiddleware.js  # ✅ JWT verification
│   │   ├── roleMiddleware.js  # ✅ Role-based access
│   │   ├── validationMiddleware.js # ✅ Input validation
│   │   └── errorHandlerMiddleware.js # ✅ Error handling
│   ├── models/
│   │   ├── Staff.js           # ✅ Staff/User model
│   │   ├── Order.js           # Order model
│   │   ├── MenuItem.js        # Menu item model
│   │   ├── Table.js           # Table model
│   │   ├── Invoice.js         # Invoice model
│   │   └── ...
│   ├── routes/
│   │   ├── index.js           # Route aggregator
│   │   ├── authRoutes.js      # ✅ Auth endpoints
│   │   ├── orderRoutes.js     # Order endpoints
│   │   ├── menuRoutes.js      # Menu endpoints
│   │   └── ...
│   ├── services/
│   │   ├── TableService.js    # Business logic
│   │   ├── MenuItemService.js
│   │   └── ...
│   ├── utils/
│   │   ├── asyncHandler.js    # ✅ Async error wrapper
│   │   ├── responseHandler.js # ✅ Standardized responses
│   │   ├── tokenHelper.js     # ✅ JWT utilities
│   │   └── errors/
│   │       └── AppError.js    # ✅ Custom error class
│   ├── validators/
│   │   ├── authValidator.js   # ✅ Auth validation rules
│   │   └── ...
│   └── app.js                 # ✅ Express app setup
├── tests/                     # 🚧 Test files
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── server.js                  # ✅ Entry point
└── README.md
```

## 📊 Development Progress

### Sprint 1: Authentication & Core Setup ✅ COMPLETE

- [x] Install required dependencies
- [x] Set up JWT configuration
- [x] Create token helper utilities
- [x] Implement authentication middleware
- [x] Implement role-based authorization
- [x] Create validation middleware
- [x] Enhance Staff model with password hashing
- [x] Implement AuthController
  - [x] Register endpoint
  - [x] Login endpoint
  - [x] Logout endpoint
  - [x] Get profile endpoint
  - [x] Update profile endpoint
  - [x] Change password endpoint
  - [x] Refresh token endpoint
- [x] Add security middleware (helmet, cors, rate limiting)
- [x] Create comprehensive Swagger documentation
- [x] Test all authentication endpoints

### Sprint 2: Menu & Table Management 🚧 IN PROGRESS

- [x] Implement Staff Management CRUD (Admin/Manager)
- [x] Secure staff routes with RBAC (Admin)
- [x] Add validation and status toggling for staff
- [x] Build Staff API documentation in Swagger

- [ ] Create Category model
- [ ] Implement CategoryController
- [ ] Complete MenuItemController
- [ ] Enhance TableController
- [ ] Implement ReservationController
- [ ] Add validation for all endpoints
- [ ] Test menu and table operations

### Sprint 3: POS & Invoicing 📅 PLANNED

- [ ] Complete OrderController
- [ ] Implement order status workflow
- [ ] Complete InvoiceController
- [ ] Implement invoice calculations
- [ ] Add payment processing
- [ ] Test complete order flow

### Sprint 4: Inventory Management 📅 PLANNED

- [ ] Implement SupplierController
- [ ] Complete InventoryItemController
- [ ] Create StockMovementController
- [ ] Implement low stock alerts
- [ ] Link menu items to inventory
- [ ] Test inventory tracking

### Sprint 5: Reports & Analytics 📅 PLANNED

- [ ] Implement ReportController
- [ ] Create sales reports
- [ ] Create inventory reports
- [ ] Create staff performance reports
- [ ] Add data visualization
- [ ] Test all reports

### Sprint 6: Testing & Documentation 📅 PLANNED

- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Write E2E tests
- [ ] Complete API documentation
- [ ] Create deployment guide
- [ ] Performance optimization

## 🔧 Environment Variables

| Variable                 | Description                          | Default     | Required |
| ------------------------ | ------------------------------------ | ----------- | -------- |
| `PORT`                   | Server port                          | 3000        | No       |
| `NODE_ENV`               | Environment (development/production) | development | Yes      |
| `MONGODB_URI`            | MongoDB connection string            | -           | Yes      |
| `JWT_SECRET`             | Secret key for access tokens         | -           | Yes      |
| `JWT_EXPIRES_IN`         | Access token expiration              | 7d          | No       |
| `JWT_REFRESH_SECRET`     | Secret key for refresh tokens        | -           | Yes      |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration             | 30d         | No       |
| `BCRYPT_SALT_ROUNDS`     | Bcrypt salt rounds                   | 12          | No       |

## 📜 Scripts

```bash
# Development
pnpm run dev          # Start with nodemon (auto-reload)

# Production
pnpm start            # Start production server

# Testing (coming soon)
pnpm test             # Run all tests
pnpm run test:watch   # Run tests in watch mode
pnpm run test:coverage # Generate coverage report
```

## 🔐 Security Best Practices

- ✅ Passwords are hashed with bcrypt (12 salt rounds)
- ✅ JWT tokens with expiration
- ✅ HTTP-only cookies for token storage
- ✅ Rate limiting to prevent abuse
- ✅ Input validation on all endpoints
- ✅ Security headers with Helmet.js
- ✅ CORS configuration
- ✅ Environment variables for sensitive data
- ⚠️ Remember to change JWT secrets in production
- ⚠️ Enable HTTPS in production
- ⚠️ Configure CORS for specific origins in production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohamed Abdellhay** - _Initial work_ - [Mohamed Abdellhay](https://linkedin.com/in/mohamedabdellhay)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- All contributors who help improve this project

## 📞 Support

For support, email support@restaurant-erp.com or open an issue in the GitHub repository.

---

**Made with ❤️ for the restaurant industry**
