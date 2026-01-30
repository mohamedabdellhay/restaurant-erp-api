import "dotenv/config";

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
};

export const bcryptConfig = {
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
};
