import ReservationService from "../services/ReservationService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";

class ReservationController {
  index = asyncHandler(async (req, res) => {
    const reservations = await ReservationService.getAll();
    ResponseHandler.success(
      res,
      reservations,
      "Reservations retrieved successfully",
    );
  });

  getReservationById = asyncHandler(async (req, res) => {
    const reservation = await ReservationService.getById(req.params.id);
    if (!reservation)
      return ResponseHandler.error(res, "Reservation not found", 404);
    ResponseHandler.success(
      res,
      reservation,
      "Reservation retrieved successfully",
    );
  });

  create = asyncHandler(async (req, res) => {
    const reservation = await ReservationService.create(req.body);
    ResponseHandler.created(
      res,
      reservation,
      "Reservation created successfully",
    );
  });

  update = asyncHandler(async (req, res) => {
    const reservation = await ReservationService.update(
      req.params.id,
      req.body,
    );
    if (!reservation)
      return ResponseHandler.error(res, "Reservation not found", 404);
    ResponseHandler.success(
      res,
      reservation,
      "Reservation updated successfully",
    );
  });

  delete = asyncHandler(async (req, res) => {
    const reservation = await ReservationService.delete(req.params.id);
    if (!reservation)
      return ResponseHandler.error(res, "Reservation not found", 404);
    ResponseHandler.success(res, null, "Reservation deleted successfully");
  });
}

export default new ReservationController();
