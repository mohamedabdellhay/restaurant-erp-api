// routes/swagger.js
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import "dotenv/config";

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant ERP API",
      version: "1.0.0",
      description: `
# Restaurant ERP System API Documentation

A comprehensive ERP system for restaurant management including:
- **Authentication & Authorization** - JWT-based secure authentication
- **Staff Management** - Manage employees and roles
- **Menu Management** - Categories and menu items
- **Table Management** - Table reservations and status
- **Order Management** - POS system for orders
- **Invoice Management** - Billing and payments
- **Inventory Management** - Stock tracking and suppliers
- **Reports** - Sales, inventory, and analytics

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## Getting Started
1. Register a new staff member at \`POST /api/auth/register\`
2. Login to get your JWT token at \`POST /api/auth/login\`
3. Use the token to access protected endpoints
      `,
      contact: {
        name: "API Support",
        email: "support@restaurant-erp.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
        description: "Development server",
      },
      {
        url: "https://api.restaurant-erp.com/api",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization endpoints",
      },
      {
        name: "Staff",
        description: "Staff management operations",
      },
      {
        name: "Restaurant",
        description: "Restaurant settings and configuration",
      },
      {
        name: "Tables",
        description: "Table management and status",
      },
      {
        name: "Reservations",
        description: "Table reservation system",
      },
      {
        name: "Menu",
        description: "Menu items and categories",
      },
      {
        name: "Orders",
        description: "Order management (POS system)",
      },
      {
        name: "Invoices",
        description: "Invoice and billing management",
      },
      {
        name: "Inventory",
        description: "Inventory and stock management",
      },
      {
        name: "Suppliers",
        description: "Supplier management",
      },
      {
        name: "Reports",
        description: "Analytics and reporting",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        Staff: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "697c64236af7d7011759f9b3",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@restaurant.com",
            },
            role: {
              type: "string",
              enum: ["admin", "manager", "cashier", "chef", "waiter"],
              example: "cashier",
            },
            restaurant: {
              type: "string",
              example: "697c64236af7d7011759f9b4",
            },
            isActive: {
              type: "boolean",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Restaurant: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "697c64236af7d7011759f9b4",
            },
            name: {
              type: "string",
              example: "Gourmet Garden",
            },
            address: {
              type: "string",
              example: "123 Foodie St, Cairo, Egypt",
            },
            phone: {
              type: "string",
              example: "+20123456789",
            },
            email: {
              type: "string",
              format: "email",
              example: "contact@gourmetgarden.com",
            },
            website: {
              type: "string",
              example: "https://gourmetgarden.com",
            },
            currency: {
              type: "string",
              example: "EGP",
            },
            settings: {
              type: "object",
              properties: {
                taxPercent: {
                  type: "number",
                  example: 14,
                },
                serviceChargePercent: {
                  type: "number",
                  example: 12,
                },
                theme: {
                  type: "object",
                  description: "Business theme and color schema settings",
                  properties: {
                    primaryColor: {
                      type: "string",
                      format: "hex-color",
                      example: "#3498db",
                      description: "Primary brand color in hex format",
                    },
                    secondaryColor: {
                      type: "string",
                      format: "hex-color",
                      example: "#2ecc71",
                      description: "Secondary brand color in hex format",
                    },
                    accentColor: {
                      type: "string",
                      format: "hex-color",
                      example: "#e74c3c",
                      description: "Accent color for highlights in hex format",
                    },
                    logo: {
                      type: "string",
                      example: "https://example.com/custom-logo.png",
                      description: "Custom logo URL for theme",
                    },
                    mode: {
                      type: "string",
                      enum: ["light", "dark"],
                      example: "light",
                      description: "Theme mode preference",
                    },
                  },
                },
              },
            },
            openingHours: {
              type: "object",
              properties: {
                monday: { type: "string" },
                tuesday: { type: "string" },
                wednesday: { type: "string" },
                thursday: { type: "string" },
                friday: { type: "string" },
                saturday: { type: "string" },
                sunday: { type: "string" },
              },
            },
            socialMedia: {
              type: "object",
              properties: {
                facebook: { type: "string" },
                instagram: { type: "string" },
                twitter: { type: "string" },
              },
            },
            vatNumber: {
              type: "string",
              example: "123-456-789",
            },
            crNumber: {
              type: "string",
              example: "987654",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            status: {
              type: "string",
              example: "fail",
            },
            message: {
              type: "string",
              example: "Error message",
            },
          },
        },
        Table: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "697c64236af7d7011759f9b5",
            },
            number: {
              type: "string",
              example: "T1",
            },
            seats: {
              type: "number",
              example: 4,
            },
            status: {
              type: "string",
              enum: ["available", "occupied", "reserved", "inactive"],
              example: "available",
            },
            restaurant: {
              type: "string",
              example: "697c64236af7d7011759f9b4",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "697c64236af7d7011759f9b6",
            },
            table: {
              type: "string",
              example: "697c64236af7d7011759f9b5",
            },
            restaurant: {
              type: "string",
              example: "697c64236af7d7011759f9b4",
            },
            customer: {
              type: "string",
              example: "697c64236af7d7011759f9b7",
            },
            reservedAt: {
              type: "string",
              format: "date-time",
              example: "2026-02-07T19:00:00Z",
            },
            numberOfGuests: {
              type: "number",
              example: 4,
            },
            durationMinutes: {
              type: "number",
              example: 90,
            },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled", "completed"],
              example: "pending",
            },
            notes: {
              type: "string",
              example: "Birthday dinner, window seat preferred.",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            image: { type: "string" },
            isActive: { type: "boolean" },
          },
        },
        MenuItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { $ref: "#/components/schemas/Category" },
            isActive: { type: "boolean" },
            image: { type: "string" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderNumber: { type: "number" },
            type: { type: "string", enum: ["dineIn", "takeaway", "delivery"] },
            table: { $ref: "#/components/schemas/Table" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  menuItem: { $ref: "#/components/schemas/MenuItem" },
                  qty: { type: "number" },
                  price: { type: "number" },
                },
              },
            },
            subtotal: { type: "number" },
            tax: { type: "number" },
            serviceCharge: { type: "number" },
            total: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "in_kitchen", "served", "paid", "cancelled"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Invoice: {
          type: "object",
          properties: {
            _id: { type: "string" },
            order: { $ref: "#/components/schemas/Order" },
            grandTotal: { type: "number" },
            paymentMethod: {
              type: "string",
              enum: ["cash", "card", "wallet", "online"],
            },
            paymentStatus: {
              type: "string",
              enum: ["paid", "unpaid", "pending"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        InventoryItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            sku: { type: "string" },
            unit: { type: "string" },
            costPrice: { type: "number" },
            stock: { type: "number" },
            minStockAlert: { type: "number" },
            supplier: { $ref: "#/components/schemas/Supplier" },
          },
        },
        Supplier: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            phone: { type: "string" },
            email: { type: "string", format: "email" },
            isActive: { type: "boolean" },
          },
        },
        SalesReport: {
          type: "object",
          properties: {
            totalRevenue: { type: "number" },
            averageOrderValue: { type: "number" },
            totalTax: { type: "number" },
            totalServiceCharge: { type: "number" },
            count: { type: "number" },
          },
        },
        InventoryReport: {
          type: "object",
          properties: {
            totalItems: { type: "number" },
            totalStockValue: { type: "number" },
            lowStockCount: { type: "number" },
          },
        },
        OrderAnalytics: {
          type: "object",
          properties: {
            statusDistribution: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  count: { type: "number" },
                },
              },
            },
            typeDistribution: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  count: { type: "number" },
                },
              },
            },
            hourlyTrends: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "number" },
                  count: { type: "number" },
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation successful",
            },
            data: {
              type: "object",
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Authentication token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                success: false,
                status: "fail",
                message: "Not authorized to access this route",
              },
            },
          },
        },
        ForbiddenError: {
          description: "User does not have permission to access this resource",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                success: false,
                status: "fail",
                message: "Access denied. Admin only.",
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                success: false,
                status: "fail",
                message: "Validation error message",
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                success: false,
                status: "fail",
                message: "Resource not found",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(specs));

export default router;
