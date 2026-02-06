import tokenHelper from "../utils/tokenHelper.js";
import AppError from "../utils/errors/AppError.js";
import Staff from "../models/Staff.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Protect routes - verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Check for token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new AppError("Not authorized to access this route", 401);
  }

  // Verify token
  const decoded = tokenHelper.verifyAccessToken(token);

  // Get user from token
  const staff = await Staff.findById(decoded.id).select("-passwordHash");

  if (!staff) {
    throw new AppError("User no longer exists", 401);
  }

  // Attach user to request
  req.user = staff;
  next();
});

/**
 * Optional auth - doesn't fail if no token
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = tokenHelper.verifyAccessToken(token);
      const staff = await Staff.findById(decoded.id).select("-passwordHash");
      if (staff) {
        req.user = staff;
      }
    } catch (error) {
      // Continue without user
    }
  }

  next();
});

/**
 * Restrict routes to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array ['admin', 'manager']
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        "You do not have permission to perform this action",
        403,
      );
    }

    next();
  };
};
