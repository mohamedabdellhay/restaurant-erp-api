import SupplierModel from "../models/supplier.js";
import SupplierTransactionModel from "../models/SupplierTransaction.js";

class SupplierService {
  async getAllSuppliers(restaurantId, filter = {}) {
    return await SupplierModel.find({
      ...filter,
      restaurant: restaurantId,
    }).sort({
      name: 1,
    });
  }

  async getSupplierById(id, restaurantId) {
    return await SupplierModel.findOne({ _id: id, restaurant: restaurantId });
  }

  async createSupplier(data) {
    return await SupplierModel.create(data);
  }

  async updateSupplier(id, restaurantId, data) {
    return await SupplierModel.findOneAndUpdate(
      { _id: id, restaurant: restaurantId },
      data,
      { new: true, runValidators: true },
    );
  }

  async deleteSupplier(id, restaurantId) {
    return await SupplierModel.findOneAndDelete({
      _id: id,
      restaurant: restaurantId,
    });
  }

  async addPayment(supplierId, restaurantId, data, userId) {
    const supplier = await SupplierModel.findOne({
      _id: supplierId,
      restaurant: restaurantId,
    });
    if (!supplier) throw new Error("Supplier not found");

    const transaction = await SupplierTransactionModel.create({
      supplier: supplierId,
      restaurant: restaurantId,
      type: "payment",
      amount: data.amount,
      description: data.description || "Payment to supplier",
      createdBy: userId,
    });

    // Decrease balance
    supplier.balance -= data.amount;
    await supplier.save();

    return transaction;
  }

  async getAccountStatement(supplierId, restaurantId) {
    const supplier = await SupplierModel.findOne({
      _id: supplierId,
      restaurant: restaurantId,
    });
    if (!supplier) throw new Error("Supplier not found");

    const transactions = await SupplierTransactionModel.find({
      supplier: supplierId,
      restaurant: restaurantId,
    }).sort({ createdAt: -1 });

    return {
      supplier: {
        name: supplier.name,
        balance: supplier.balance,
      },
      transactions,
    };
  }
}

export default new SupplierService();
