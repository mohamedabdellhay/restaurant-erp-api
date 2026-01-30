import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";
import AppError from "./errors/AppError.js";

class TokenHelper {
  /**
   * Generate access token
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(payload) {
    return jwt.sign(payload, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Token has expired", 401);
      }
      throw new AppError("Invalid token", 401);
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, jwtConfig.refreshSecret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Refresh token has expired", 401);
      }
      throw new AppError("Invalid refresh token", 401);
    }
  }

  /**
   * Generate both tokens
   */
  generateTokenPair(payload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}

export default new TokenHelper();
