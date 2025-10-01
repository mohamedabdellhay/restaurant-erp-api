import express from "express";

const groupRoutes = function (prefix, middleware, callback) {
  // If middleware is a function (callback), shift arguments
  if (typeof middleware === "function" && !callback) {
    callback = middleware;
    middleware = [];
  }

  // Ensure middleware is an array
  if (!Array.isArray(middleware)) {
    middleware = [middleware];
  }

  const groupRouter = express.Router();
  callback(groupRouter);
  this.use(prefix, ...middleware, groupRouter);
  return this;
};

export default groupRoutes;
