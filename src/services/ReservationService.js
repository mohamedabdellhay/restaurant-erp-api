import ReservationModel from "../models/Reservation.js";
import CustomerModel from "../models/Customer.js";

class ReservationService {
  async getAll(filter = {}) {
    return await ReservationModel.find(filter)
      .populate("table", "number seats")
      .populate("customer", "name phone email")
      .sort({ reservedAt: -1 });
  }

  async getById(id) {
    return await ReservationModel.findById(id)
      .populate("table", "number seats")
      .populate("customer", "name phone email");
  }

  async create(data) {
    return await ReservationModel.create(data);
  }

  async request(data) {
    const { name, phone, email, restaurant, ...reservationData } = data;

    if (!restaurant) {
      throw new Error("Restaurant ID is required for reservation requests");
    }

    // Find or create customer within the specified restaurant
    let customer = await CustomerModel.findOne({ phone, restaurant });

    if (customer) {
      if (name) customer.name = name;
      if (email) customer.email = email;
      await customer.save();
    } else {
      customer = await CustomerModel.create({
        name,
        phone,
        email,
        restaurant,
      });
    }

    // Create reservation
    return await ReservationModel.create({
      ...reservationData,
      restaurant,
      customer: customer._id,
      status: "pending",
    });
  }

  async update(id, data) {
    return await ReservationModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("table", "number seats")
      .populate("customer", "name phone email");
  }

  async delete(id) {
    return await ReservationModel.findByIdAndDelete(id);
  }
}

export default new ReservationService();
