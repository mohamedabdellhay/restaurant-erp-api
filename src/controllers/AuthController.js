import Staff from "../models/Staff.js";
import tokenHelper from "../utils/tokenHelper.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import AppError from "../utils/errors/AppError.js";

class AuthController {
  /**
   * Register new staff member
   * POST /api/auth/register
   */
  register = asyncHandler(async (req, res) => {
    const { name, email, password, role, restaurant } = req.body;

    // Check if user already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      throw new AppError("Email already registered", 409);
    }

    // Create staff
    const staff = await Staff.create({
      name,
      email,
      passwordHash: password,
      role,
      restaurant,
    });

    // Generate tokens
    const { accessToken, refreshToken } = tokenHelper.generateTokenPair({
      id: staff._id,
      role: staff.role,
    });

    // Set cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    ResponseHandler.created(
      res,
      {
        staff,
        accessToken,
        refreshToken,
      },
      "Staff registered successfully",
    );
  });

  /**
   * Login staff member
   * POST /api/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find staff with password
    const staff = await Staff.findOne({ email }).select("+passwordHash");

    if (!staff) {
      throw new AppError("Invalid credentials", 401);
    }

    // Check if staff is active
    if (!staff.isActive) {
      throw new AppError("Account is deactivated", 403);
    }

    // Verify password
    const isPasswordValid = await staff.comparePassword(password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = tokenHelper.generateTokenPair({
      id: staff._id,
      role: staff.role,
    });

    // Set cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Remove password from response
    staff.passwordHash = undefined;

    ResponseHandler.success(
      res,
      {
        staff,
        accessToken,
        refreshToken,
      },
      "Logged in successfully",
    );
  });

  /**
   * Logout staff member
   * POST /api/auth/logout
   */
  logout = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    ResponseHandler.success(res, null, "Logged out successfully");
  });

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  getProfile = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.user._id).populate("restaurant");

    ResponseHandler.success(res, staff, "Profile retrieved successfully");
  });

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  updateProfile = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );

    ResponseHandler.success(res, staff, "Profile updated successfully");
  });

  /**
   * Change password
   * PUT /api/auth/change-password
   */
  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const staff = await Staff.findById(req.user._id).select("+passwordHash");

    // Verify current password
    const isPasswordValid = await staff.comparePassword(currentPassword);

    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 401);
    }

    // Update password
    staff.passwordHash = newPassword;
    await staff.save();

    ResponseHandler.success(res, null, "Password changed successfully");
  });

  /**
   * Refresh access token
   * POST /api/auth/refresh-token
   */
  refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    // Verify refresh token
    const decoded = tokenHelper.verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = tokenHelper.generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    ResponseHandler.success(
      res,
      { accessToken: newAccessToken },
      "Token refreshed successfully",
    );
  });
}

export default new AuthController();
