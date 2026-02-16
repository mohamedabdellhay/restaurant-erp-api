import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";

// Import models
import Plan from "../models/Plan.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";
import Staff from "../models/Staff.js";
import Table from "../models/Table.js";
import InventoryItem from "../models/InventoryItem.js";
import supplier from "../models/supplier.js";

// Plans data
const plans = [
  {
    name: "Basic",
    price: 1500,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
    ],
    limits: {
      users: 2,
      branches: 1,
    },
    description: "For small restaurants.",
  },
  {
    name: "Standard",
    price: 3000,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
      "inventory",
      "table_management",
      "staff_management",
      "advanced_reports",
      "user_roles",
    ],
    limits: {
      users: 5,
      branches: 1,
    },
    description: "For medium restaurants.",
  },
  {
    name: "Premium",
    price: 6000,
    features: [
      "pos",
      "order_management",
      "bill_printing",
      "product_management",
      "simple_reports",
      "inventory",
      "table_management",
      "staff_management",
      "advanced_reports",
      "user_roles",
      "multi_branch",
      "dashboard",
      "api_integration",
      "loyalty_system",
      "fast_support",
    ],
    limits: {
      users: 999,
      branches: 999,
    },
    description: "For large restaurants or chains.",
  },
];

// Restaurant data
const restaurantData = {
  name: "The Golden Fork",
  address: "123 Main Street, Cairo, Egypt",
  phone: "+20 123 456 7890",
  email: "info@goldenfork.com",
  website: "https://goldenfork.com",
  currency: "EGP",
  settings: {
    taxPercent: 14,
    serviceChargePercent: 12,
    theme: {
      primaryColor: "#D4AF37",
      secondaryColor: "#1a1a1a",
      accentColor: "#ff6b6b",
      mode: "light",
    },
  },
  openingHours: {
    monday: "10:00 AM - 11:00 PM",
    tuesday: "10:00 AM - 11:00 PM",
    wednesday: "10:00 AM - 11:00 PM",
    thursday: "10:00 AM - 11:00 PM",
    friday: "10:00 AM - 12:00 AM",
    saturday: "10:00 AM - 12:00 AM",
    sunday: "10:00 AM - 11:00 PM",
  },
  socialMedia: {
    facebook: "https://facebook.com/goldenfork",
    instagram: "https://instagram.com/goldenfork",
    twitter: "https://twitter.com/goldenfork",
  },
  vatNumber: "123456789",
  crNumber: "987654321",
};

// Categories data
const categoriesData = [
  {
    name: "Appetizers",
    description: "Start your meal with our delicious appetizers",
    isActive: true,
  },
  {
    name: "Main Courses",
    description: "Hearty and satisfying main dishes",
    isActive: true,
  },
  {
    name: "Desserts",
    description: "Sweet treats to end your meal",
    isActive: true,
  },
  {
    name: "Beverages",
    description: "Refreshing drinks and beverages",
    isActive: true,
  },
  {
    name: "Salads",
    description: "Fresh and healthy salad options",
    isActive: true,
  },
];

// Menu items data (will be populated with category references)
const menuItemsData = [
  // Appetizers
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    price: 45,
    categoryName: "Appetizers",
    isActive: true,
  },
  {
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    price: 25,
    categoryName: "Appetizers",
    isActive: true,
  },
  {
    name: "Chicken Wings",
    description: "Crispy chicken wings with your choice of sauce",
    price: 65,
    categoryName: "Appetizers",
    isActive: true,
  },
  // Main Courses
  {
    name: "Grilled Chicken",
    description: "Tender grilled chicken breast with vegetables",
    price: 120,
    categoryName: "Main Courses",
    isActive: true,
  },
  {
    name: "Beef Steak",
    description: "Premium beef steak cooked to perfection",
    price: 250,
    categoryName: "Main Courses",
    isActive: true,
  },
  {
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon and parmesan",
    price: 95,
    categoryName: "Main Courses",
    isActive: true,
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: 85,
    categoryName: "Main Courses",
    isActive: true,
  },
  // Desserts
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting",
    price: 50,
    categoryName: "Desserts",
    isActive: true,
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 60,
    categoryName: "Desserts",
    isActive: true,
  },
  {
    name: "Ice Cream",
    description: "Three scoops of your favorite flavors",
    price: 35,
    categoryName: "Desserts",
    isActive: true,
  },
  // Beverages
  {
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 30,
    categoryName: "Beverages",
    isActive: true,
  },
  {
    name: "Cappuccino",
    description: "Italian coffee with steamed milk",
    price: 25,
    categoryName: "Beverages",
    isActive: true,
  },
  {
    name: "Soft Drink",
    description: "Choice of cola, sprite, or fanta",
    price: 15,
    categoryName: "Beverages",
    isActive: true,
  },
  // Salads
  {
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese and olives",
    price: 55,
    categoryName: "Salads",
    isActive: true,
  },
  {
    name: "Garden Salad",
    description: "Mixed greens with fresh vegetables",
    price: 40,
    categoryName: "Salads",
    isActive: true,
  },
];

// Staff data
const staffData = [
  {
    name: "Admin User",
    email: "admin@goldenfork.com",
    password: "Admin@123",
    phone: "+20 100 000 0001",
    role: "admin",
    isActive: true,
  },
  {
    name: "John Manager",
    email: "manager@goldenfork.com",
    password: "Manager@123",
    phone: "+20 100 000 0002",
    role: "manager",
    isActive: true,
  },
  {
    name: "Sarah Cashier",
    email: "cashier@goldenfork.com",
    password: "Cashier@123",
    phone: "+20 100 000 0003",
    role: "cashier",
    isActive: true,
  },
  {
    name: "Mike Chef",
    email: "chef@goldenfork.com",
    password: "Chef@123",
    phone: "+20 100 000 0004",
    role: "chef",
    isActive: true,
  },
  {
    name: "Emma Waiter",
    email: "waiter@goldenfork.com",
    password: "Waiter@123",
    phone: "+20 100 000 0005",
    role: "waiter",
    isActive: true,
  },
];

// Tables data
const tablesData = [
  { number: 1, capacity: 2, location: "Main Hall", status: "available" },
  { number: 2, capacity: 4, location: "Main Hall", status: "available" },
  { number: 3, capacity: 4, location: "Main Hall", status: "available" },
  { number: 4, capacity: 6, location: "Main Hall", status: "available" },
  { number: 5, capacity: 2, location: "Terrace", status: "available" },
  { number: 6, capacity: 4, location: "Terrace", status: "available" },
  { number: 7, capacity: 8, location: "Private Room", status: "available" },
  { number: 8, capacity: 6, location: "Main Hall", status: "available" },
];

// Inventory items data
const inventoryItemsData = [
  {
    name: "Chicken Breast",
    unit: "kg",
    quantity: 50,
    minQuantity: 10,
    price: 80,
  },
  {
    name: "Beef",
    unit: "kg",
    quantity: 30,
    minQuantity: 5,
    price: 200,
  },
  {
    name: "Pasta",
    unit: "kg",
    quantity: 40,
    minQuantity: 10,
    price: 25,
  },
  {
    name: "Tomatoes",
    unit: "kg",
    quantity: 25,
    minQuantity: 5,
    price: 15,
  },
  {
    name: "Lettuce",
    unit: "kg",
    quantity: 20,
    minQuantity: 5,
    price: 20,
  },
  {
    name: "Mozzarella Cheese",
    unit: "kg",
    quantity: 15,
    minQuantity: 3,
    price: 120,
  },
  {
    name: "Olive Oil",
    unit: "liter",
    quantity: 10,
    minQuantity: 2,
    price: 150,
  },
  {
    name: "Coffee Beans",
    unit: "kg",
    quantity: 8,
    minQuantity: 2,
    price: 300,
  },
  {
    name: "Orange",
    unit: "kg",
    quantity: 30,
    minQuantity: 10,
    price: 20,
  },
  {
    name: "Chocolate",
    unit: "kg",
    quantity: 12,
    minQuantity: 3,
    price: 180,
  },
];

// Suppliers data
const suppliersData = [
  {
    name: "Fresh Produce Co.",
    contactPerson: "Ahmed Hassan",
    phone: "+20 100 111 1111",
    email: "contact@freshproduce.com",
    address: "456 Market Street, Cairo",
    category: "Vegetables & Fruits",
  },
  {
    name: "Premium Meats Ltd.",
    contactPerson: "Mohamed Ali",
    phone: "+20 100 222 2222",
    email: "sales@premiummeats.com",
    address: "789 Industrial Zone, Cairo",
    category: "Meat & Poultry",
  },
  {
    name: "Dairy Delights",
    contactPerson: "Sara Ibrahim",
    phone: "+20 100 333 3333",
    email: "info@dairydelights.com",
    address: "321 Dairy Road, Giza",
    category: "Dairy Products",
  },
];

const seedDatabase = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB successfully\n");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Promise.all([
      Plan.deleteMany({}),
      Restaurant.deleteMany({}),
      Category.deleteMany({}),
      MenuItem.deleteMany({}),
      Staff.deleteMany({}),
      Table.deleteMany({}),
      InventoryItem.deleteMany({}),
      supplier.deleteMany({}),
    ]);
    console.log("✅ Existing data cleared\n");

    // Seed Plans
    console.log("📋 Seeding Plans...");
    const createdPlans = await Plan.insertMany(plans);
    console.log(`✅ Created ${createdPlans.length} plans\n`);

    // Seed Restaurant
    console.log("🏢 Seeding Restaurant...");
    const restaurant = await Restaurant.create(restaurantData);
    console.log(`✅ Created restaurant: ${restaurant.name}\n`);

    // Seed Categories
    console.log("📂 Seeding Categories...");
    const categoriesWithRestaurant = categoriesData.map((cat) => ({
      ...cat,
      restaurant: restaurant._id,
    }));
    const createdCategories = await Category.insertMany(
      categoriesWithRestaurant,
    );
    console.log(`✅ Created ${createdCategories.length} categories\n`);

    // Create category map for menu items
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Seed Menu Items
    console.log("🍽️  Seeding Menu Items...");
    const menuItemsWithRefs = menuItemsData.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      isActive: item.isActive,
      category: categoryMap[item.categoryName],
      restaurant: restaurant._id,
    }));
    const createdMenuItems = await MenuItem.insertMany(menuItemsWithRefs);
    console.log(`✅ Created ${createdMenuItems.length} menu items\n`);

    // Seed Staff (passwords will be hashed by the model's pre-save hook)
    console.log("👥 Seeding Staff...");
    const createdStaff = [];
    for (const staff of staffData) {
      const newStaff = new Staff({
        name: staff.name,
        email: staff.email,
        passwordHash: staff.password, // The model's pre-save hook will hash this
        phone: staff.phone,
        role: staff.role,
        isActive: staff.isActive,
        restaurant: restaurant._id,
      });
      await newStaff.save();
      createdStaff.push(newStaff);
    }
    console.log(`✅ Created ${createdStaff.length} staff members\n`);

    // Seed Tables
    console.log("🪑 Seeding Tables...");
    const tablesWithRestaurant = tablesData.map((table) => ({
      ...table,
      restaurant: restaurant._id,
    }));
    const createdTables = await Table.insertMany(tablesWithRestaurant);
    console.log(`✅ Created ${createdTables.length} tables\n`);

    // Seed Suppliers (before inventory items)
    console.log("� Seeding Suppliers...");
    const suppliersWithRestaurant = suppliersData.map((sup) => ({
      ...sup,
      restaurant: restaurant._id,
    }));
    const createdSuppliers = await supplier.insertMany(suppliersWithRestaurant);
    console.log(`✅ Created ${createdSuppliers.length} suppliers\n`);

    // Seed Inventory Items (with supplier references)
    console.log("� Seeding Inventory Items...");
    const inventoryWithSuppliers = inventoryItemsData.map((item, index) => ({
      name: item.name,
      unit: item.unit,
      stock: item.quantity,
      minStockAlert: item.minQuantity,
      costPrice: item.price,
      supplier: createdSuppliers[index % createdSuppliers.length]._id, // Distribute items among suppliers
      restaurant: restaurant._id,
    }));
    const createdInventory = await InventoryItem.insertMany(
      inventoryWithSuppliers,
    );
    console.log(`✅ Created ${createdInventory.length} inventory items\n`);

    // Summary
    console.log("═══════════════════════════════════════");
    console.log("🎉 DATABASE SEEDING COMPLETED!");
    console.log("═══════════════════════════════════════");
    console.log(`📋 Plans: ${createdPlans.length}`);
    console.log(`🏢 Restaurant: ${restaurant.name}`);
    console.log(`📂 Categories: ${createdCategories.length}`);
    console.log(`🍽️  Menu Items: ${createdMenuItems.length}`);
    console.log(`👥 Staff: ${createdStaff.length}`);
    console.log(`🪑 Tables: ${createdTables.length}`);
    console.log(`📦 Inventory Items: ${createdInventory.length}`);
    console.log(`🚚 Suppliers: ${createdSuppliers.length}`);
    console.log("═══════════════════════════════════════\n");

    console.log("📝 Default Staff Credentials:");
    console.log("───────────────────────────────────────");
    staffData.forEach((staff) => {
      console.log(`${staff.role.toUpperCase()}:`);
      console.log(`  Email: ${staff.email}`);
      console.log(`  Password: ${staff.password}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
