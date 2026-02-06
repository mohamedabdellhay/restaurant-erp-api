import ReservationModel from "../models/Reservation.js";

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
