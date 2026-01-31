import Staff from "../models/Staff.js";

class StaffService {
  async getAllStaff(query = {}) {
    // Filter out internal fields if necessary, populate restaurant
    return await Staff.find(query).populate("restaurant");
  }

  async getStaffById(id) {
    return await Staff.findById(id).populate("restaurant");
  }

  async createStaff(data) {
    // Map 'password' to 'passwordHash' if provided
    if (data.password) {
      data.passwordHash = data.password;
      delete data.password;
    }
    // Note: Staff model middleware handles password hashing
    return await Staff.create(data);
  }

  async updateStaff(id, data) {
    // new: true Returns the modified document rather than the original
    return await Staff.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteStaff(id) {
    return await Staff.findByIdAndDelete(id);
  }

  async toggleStaffStatus(id, isActive) {
    return await Staff.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true },
    );
  }
}

export default new StaffService();
