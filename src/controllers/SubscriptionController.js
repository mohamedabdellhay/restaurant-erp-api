import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import Staff from "../models/Staff.js";
import Plan from "../models/Plan.js";
import Subscription from "../models/Subscription.js";
import tokenHelper from "../utils/tokenHelper.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import AppError from "../utils/errors/AppError.js";
import KashierService from "../services/KashierService.js";

class SubscriptionController {
  /**
   * Get all available plans
   * GET /api/subscription/plans
   */
  getPlans = asyncHandler(async (req, res) => {
    const plans = await Plan.find({ isActive: true });
    ResponseHandler.success(res, plans, "Plans retrieved successfully");
  });

  /**
   * Register new Restaurant with Subscription
   * POST /api/subscription/register
   */
  register = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const {
        restaurantName,
        restaurantAddress,
        restaurantPhone,
        restaurantEmail,
        adminName,
        adminEmail,
        adminPassword,
        planId,
      } = req.body;

      // 1. Check if email already exists
      const existingStaff = await Staff.findOne({ email: adminEmail }).session(
        session,
      );
      if (existingStaff) {
        throw new AppError("Email already registered", 409);
      }

      // 2. Validate Plan
      const plan = await Plan.findById(planId).session(session);
      if (!plan) {
        throw new AppError("Invalid Plan selected", 400);
      }

      // 3. Create Restaurant
      const restaurant = await Restaurant.create(
        [
          {
            name: restaurantName,
            address: restaurantAddress,
            phone: restaurantPhone,
            email: restaurantEmail || adminEmail, // Default to admin email if not provided
          },
        ],
        { session },
      );

      // 4. Create Admin Staff
      const adminParams = {
        name: adminName,
        email: adminEmail,
        passwordHash: adminPassword,
        role: "admin",
        restaurant: restaurant[0]._id,
      };

      const staff = await Staff.create([adminParams], { session });

      // 5. Create Subscription (Pending Payment)
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1); // Default 1 month

      const subscription = await Subscription.create(
        [
          {
            restaurant: restaurant[0]._id,
            plan: plan._id,
            startDate,
            endDate,
            status: "pending",
          },
        ],
        { session },
      );

      await session.commitTransaction();

      // 6. Generate Tokens (Optional: Check if we want to login immediately or wait for payment)
      // Determining if we should allow login. Maybe yes, but access restricted.
      const { accessToken, refreshToken } = tokenHelper.generateTokenPair({
        id: staff[0]._id,
        role: staff[0].role,
      });

      // Set cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // 7. Generate Kashier Checkout URL
      const checkoutUrl = KashierService.getCheckoutUrl(
        subscription[0]._id.toString(),
        plan.price,
        "EGP",
        { name: adminName, email: adminEmail },
        `${req.protocol}://${req.get("host")}/api/subscription/payment/callback`, // Or frontend URL
      );

      ResponseHandler.created(
        res,
        {
          restaurant: restaurant[0],
          subscription: subscription[0],
          staff: staff[0],
          accessToken,
          refreshToken,
          checkoutUrl,
        },
        "Registration successful. Please complete payment via the provided URL.",
      );
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });

  /**
   * Confirm Payment (Mock)
   * POST /api/subscription/confirm-payment
   */
  confirmPayment = asyncHandler(async (req, res) => {
    // ... existing mock implementation ...
    // You might want to keep this for admin manual override or remove it.
    // For specific Kashier request:
    const { subscriptionId, transactionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    // ... rest of existing logic ...
    subscription.status = "active";
    subscription.paymentDetails = {
      transactionId: transactionId || "MOCK_TRX_" + Date.now(),
      amount: 0,
      currency: "EGP",
      paymentMethod: "Manual",
      paidAt: new Date(),
    };
    await subscription.save();
    ResponseHandler.success(res, subscription, "Payment confirmed");
  });

  /**
   * Handle Kashier Callback
   * GET /api/subscription/payment/callback
   */
  paymentCallback = asyncHandler(async (req, res) => {
    const query = req.query;
    // Query params: paymentStatus, merchantOrderId, etc.

    // 1. Validate Signature
    const isValid = KashierService.validateCallback(query);
    if (!isValid) {
      return res.status(400).send("Invalid Payment Signature or Status");
    }

    // 2. Update Subscription
    const subscriptionId = query.merchantOrderId; // We used subscription ID as order ID
    // Note: KASHIER might append things to orderId in some modes, ensure match.
    // Assuming 1:1 match for now.

    // Check order status from query.paymentStatus
    if (query.paymentStatus !== "SUCCESS") {
      return res.redirect("http://localhost:5173/payment/failed"); // Redirect to Frontend
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).send("Subscription not found");
    }

    if (subscription.status !== "active") {
      subscription.status = "active";
      subscription.paymentDetails = {
        transactionId: query.merchantOrderId, // or kashierOrderId
        amount: parseFloat(query.amount),
        currency: query.currency,
        paymentMethod: "Kashier",
        paidAt: new Date(),
      };
      await subscription.save();
    }

    // 3. Redirect to Frontend Success Page
    // Adjust URL to your frontend
    res.redirect("http://localhost:5173/dashboard?payment=success");
  });
}

export default new SubscriptionController();
