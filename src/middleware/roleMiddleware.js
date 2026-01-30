import AppError from "../utils/errors/AppError.js";

/**
 * Authorize specific roles
 * @param  {...string} roles - Allowed roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Not authorized to access this route", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(
        `User role '${req.user.role}' is not authorized to access this route`,
        403,
      );
    }

    next();
  };
};

/**
 * Check if user is admin
 */
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new AppError("Access denied. Admin only.", 403);
  }
  next();
};

/**
 * Check if user is manager or admin
 */
export const isManagerOrAdmin = (req, res, next) => {
  if (!req.user || !["admin", "manager"].includes(req.user.role)) {
    throw new AppError("Access denied. Manager or Admin only.", 403);
  }
  next();
};
