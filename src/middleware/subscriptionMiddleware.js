import Subscription from "../models/Subscription.js";
import Restaurant from "../models/Restaurant.js";
import AppError from "../utils/errors/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const checkSubscription = asyncHandler(async (req, res, next) => {
  // Assume generic auth middleware has already populated req.user
  // and we can access restaurant from user or header etc.
  // For staff users: req.user.restaurant is populated (if we populated it) or just the ID.

  const restaurantId = req.user.restaurant;
  if (!restaurantId) {
    throw new AppError("User is not associated with a restaurant", 403);
  }

  // Find active subscription
  // We can optimize this by caching or storing plan in token, but for now query DB
  const subscription = await Subscription.findOne({
    restaurant: restaurantId,
    status: "active",
    endDate: { $gt: new Date() },
  }).populate("plan");

  if (!subscription) {
    throw new AppError("No active subscription found. Please upgrade.", 403);
  }

  // Attach to request for downstream use
  req.subscription = subscription;
  req.plan = subscription.plan;

  next();
});

export const checkFeature = (featureName) => {
  return (req, res, next) => {
    if (!req.plan) {
      return next(
        new AppError(
          "Plan information missing. Ensure checkSubscription is used first.",
          500,
        ),
      );
    }

    if (!req.plan.features.includes(featureName)) {
      return next(
        new AppError(
          `Your current plan (${req.plan.name}) does not support this feature: ${featureName}`,
          403,
        ),
      );
    }

    next();
  };
};

export const checkLimit = (limitName, model) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.plan) {
      return next(
        new AppError(
          "Plan information missing. Ensure checkSubscription is used first.",
          500,
        ),
      );
    }

    const limit = req.plan.limits[limitName];
    if (limit === undefined || limit === null) {
      // No limit defined means unlimited? Or 0? Let's assume unlimited if not specified usually, or strictly 0.
      // Based on our seed, limits are defined. 999 for unlimited.
      return next();
    }

    // Count current usage
    // This assumes model has 'restaurant' field
    const count = await model.countDocuments({
      restaurant: req.user.restaurant,
    });

    if (count >= limit) {
      throw new AppError(
        `You have reached the limit for ${limitName} (${limit}) on your current plan.`,
        403,
      );
    }

    next();
  });
};
