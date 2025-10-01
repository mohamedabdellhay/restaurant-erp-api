# 📖 Database Models Documentation (Restaurant ERP)

## 1. **User Model**

يمثل المستخدمين (موظفين – مدراء – كاشير – شيف).

```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ["admin", "manager", "cashier", "chef", "waiter"],
  phone: String,
  createdAt: Date
}
```

🔗 **علاقات:**

- ممكن يرتبط بـ `Order` (الكاشير اللي سجل الأوردر).
- ممكن يرتبط بـ `StockMovement` (الموظف اللي خصم أو أضاف مخزون).

---

## 2. **Restaurant Model**

بيمثل بيانات المطعم.

```js
{
  name: String,
  address: String,
  phone: String,
  tables: [ObjectId of Table],
  createdAt: Date
}
```

🔗 **علاقات:**

- يحتوي على عدة `Table`.

---

## 3. **Table Model**

يمثل الطاولات داخل المطعم.

```js
{
  number: String, // ex: "T1"
  seats: Number,
  status: ["available", "occupied", "reserved", "inactive"],
  restaurant: ObjectId (Restaurant),
  currentOrder: ObjectId (Order)
}
```

🔗 **علاقات:**

- مرتبط بـ `Restaurant`.
- ممكن يكون مرتبط بأوردر حالي `currentOrder`.
- ممكن يكون ليه حجوزات `Reservation`.

---

## 4. **Reservation Model**

يمثل حجوزات الطاولات.

```js
{
  table: ObjectId (Table),
  customerName: String,
  customerPhone: String,
  reservedAt: Date,
  durationMinutes: Number,
  status: ["upcoming", "ongoing", "completed", "cancelled"]
}
```

🔗 **علاقات:**

- مربوط بـ `Table`.

---

## 5. **MenuItem Model**

يمثل الأصناف في المنيو.

```js
{
  name: String,
  description: String,
  price: Number,
  category: String, // ex: "Pizza", "Drinks"
  inStock: Boolean,
  createdAt: Date
}
```

🔗 **علاقات:**

- بيتربط بـ `Order.items`.

---

## 6. **Order Model**

يمثل أوردر للعميل (من الكاشير أو الأونلاين).

```js
{
  table: ObjectId (Table),
  user: ObjectId (User), // الكاشير
  items: [
    {
      menuItem: ObjectId (MenuItem),
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  status: ["pending", "preparing", "served", "paid", "cancelled"],
  createdAt: Date
}
```

🔗 **علاقات:**

- مرتبط بـ `Table`.
- مرتبط بـ `User` (الكاشير أو الموظف).
- يحتوي على `MenuItem`.

---

## 7. **Inventory Model**

يمثل المخزون العام (مواد خام).

```js
{
  name: String,
  unit: String, // ex: "kg", "liters"
  quantity: Number,
  minQuantity: Number, // أقل كمية مسموح بيها
  createdAt: Date
}
```

🔗 **علاقات:**

- بيتأثر بـ `StockMovement`.

---

## 8. **StockMovement Model**

بيسجل كل حركة مخزون (إضافة – خصم – تحديث).

```js
{
  item: ObjectId (Inventory),
  type: ["in", "out"],
  quantity: Number,
  reason: String, // ex: "new stock", "used in order"
  user: ObjectId (User), // الموظف اللي عمل الحركة
  createdAt: Date
}
```

🔗 **علاقات:**

- مربوط بـ `Inventory`.
- مربوط بـ `User`.

---

# ⚡ ملاحظات عامة

- كل **Model** فيه `createdAt` علشان تقدر تعمل تقارير زمنية.
- العلاقات كلها معمولة بـ `ObjectId` علشان تستخدم `populate()`.
- النظام بيدعم:

  - **POS System** (Orders + Tables + Menu).
  - **Reservation System**.
  - **Inventory Management**.
  - **User Roles & Permissions**.
