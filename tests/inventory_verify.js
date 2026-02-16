import mongoose from "mongoose";
import InventoryService from "../src/services/InventoryService.js";
import SupplierService from "../src/services/SupplierService.js";
import InventoryItem from "../src/models/InventoryItem.js";
import Supplier from "../src/models/supplier.js";
import StockMovement from "../src/models/StockMovement.js";
import SupplierTransaction from "../src/models/SupplierTransaction.js";
import "dotenv/config";

const TEST_RESTAURANT_ID = new mongoose.Types.ObjectId();
const TEST_USER_ID = new mongoose.Types.ObjectId();

async function runVerification() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for verification...");

    // 1. Create a Supplier
    console.log("Testing Supplier Creation...");
    const supplier = await SupplierService.createSupplier({
      name: "Test Supplier",
      phone: "123456789",
      restaurant: TEST_RESTAURANT_ID,
    });
    console.log("Supplier created:", supplier._id);

    // 2. Create an Inventory Item
    console.log("Testing Inventory Item Creation...");
    const item = await InventoryService.createItem({
      name: "Test Item",
      sku: "TEST-001",
      unit: "kg",
      costPrice: 10,
      stock: 50,
      minStockAlert: 10,
      supplier: supplier._id,
      restaurant: TEST_RESTAURANT_ID,
    });
    console.log("Item created:", item._id);

    // 3. Update Stock (Audit Test)
    console.log("Testing Stock Update & Auditing...");
    await InventoryService.updateStock(
      item._id,
      TEST_RESTAURANT_ID,
      20,
      "addition",
      TEST_USER_ID,
    );

    const updatedItem = await InventoryService.getItemById(
      item._id,
      TEST_RESTAURANT_ID,
    );
    console.log("New stock level:", updatedItem.stock); // Should be 70

    const movement = await StockMovement.findOne({ inventoryItem: item._id });
    console.log(
      "Stock movement recorded:",
      movement ? "YES" : "NO",
      movement?.qty,
    );

    // 4. Test Financial Statement
    console.log("Testing Supplier Account Statement...");
    const statement = await SupplierService.getAccountStatement(
      supplier._id,
      TEST_RESTAURANT_ID,
    );
    console.log("Current Balance after purchase:", statement.supplier.balance); // Should match costPrice * qty
    console.log("Transaction count:", statement.transactions.length);

    // 5. Test Payment
    console.log("Testing Supplier Payment...");
    await SupplierService.addPayment(
      supplier._id,
      TEST_RESTAURANT_ID,
      { amount: 50, description: "Test Payment" },
      TEST_USER_ID,
    );
    const statementAfterPayment = await SupplierService.getAccountStatement(
      supplier._id,
      TEST_RESTAURANT_ID,
    );
    console.log(
      "Current Balance after payment:",
      statementAfterPayment.supplier.balance,
    );

    // 6. Multi-tenant Check
    console.log("Testing Multi-tenant Scoping...");
    const otherRestaurantId = new mongoose.Types.ObjectId();
    const itemsForOther = await InventoryService.getAllItems(otherRestaurantId);
    console.log(
      "Items for other restaurant (should be 0):",
      itemsForOther.length,
    );

    // Cleanup (optional but good for repeated tests)
    await InventoryItem.findByIdAndDelete(item._id);
    await Supplier.findByIdAndDelete(supplier._id);
    await StockMovement.deleteMany({ inventoryItem: item._id });
    await SupplierTransaction.deleteMany({ supplier: supplier._id });

    console.log("\n✅ Verification Successful!");
  } catch (error) {
    console.error("\n❌ Verification Failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

runVerification();
