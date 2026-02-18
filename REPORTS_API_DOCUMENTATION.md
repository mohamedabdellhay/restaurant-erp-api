# Restaurant ERP - Reports & Analytics API Documentation

This document provides details for the reporting and dashboard endpoints available for the frontend team.

## Base URL
`/api`

## Authentication
All endpoints require a Bearer Token (`Authorization: Bearer <token>`) and are restricted to users with `admin` or `manager` roles.

---

## 1. Dashboard Endpoints
Endpoints located under `/dashboard` for high-level metrics and real-time data.

### 1.1 Overview Metrics
- **Endpoint:** `GET /dashboard/overview`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Returns summary metrics including total revenue, average order value, total orders, and total customers.

### 1.2 Revenue Analytics
- **Endpoint:** `GET /dashboard/revenue`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
  - `groupBy`: Grouping period (`hour`, `day`, `week`, `month`). Default: `day`.
- **Description:** Returns revenue trends over time with breakdown by payment method and order type.

### 1.3 Top Selling Items
- **Endpoint:** `GET /dashboard/top-items`
- **Parameters:**
  - `limit`: Number of items to return. Default: `10`.
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Returns best-performing menu items by revenue and quantity sold. Includes processed image URLs.

### 1.4 Staff Performance
- **Endpoint:** `GET /dashboard/staff-performance`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Returns productivity metrics for each staff member (orders, revenue, average order value).

### 1.5 Customer Insights
- **Endpoint:** `GET /dashboard/customers`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Returns customer analytics including new vs. returning customers and top customers by spending.

### 1.6 Real-time Metrics
- **Endpoint:** `GET /dashboard/realtime`
- **Description:** Live dashboard data for today (revenue, orders, table occupancy, pending reservations).

### 1.7 Inventory Alerts
- **Endpoint:** `GET /dashboard/inventory-alerts`
- **Description:** Returns low stock items and total inventory value summary.

---

## 2. Report Endpoints
Endpoints located under `/reports` for deeper analytical reports.

### 2.1 Sales Performance Report
- **Endpoint:** `GET /reports/sales`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Detailed sales performance report within the specified period.

### 2.2 Inventory Summary Report
- **Endpoint:** `GET /reports/inventory`
- **Description:** Summary of current inventory status and value.

### 2.3 Order Analytics
- **Endpoint:** `GET /reports/orders`
- **Parameters:**
  - `from`: Start date (YYYY-MM-DD)
  - `to`: End date (YYYY-MM-DD)
- **Description:** Trends and analytics for orders processed.

### 2.4 Reservations Report
- **Endpoint:** `GET /reports/reservations`
- **Description:** Reservation statistics and summaries.

---

## Response Format
All successful responses follow this standard structure:
```json
{
  "success": true,
  "message": "Success message translated based on Accept-Language header",
  "data": { ... }
}
```
