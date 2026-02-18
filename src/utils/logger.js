import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOGS_DIR, "system.log");

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

class Logger {
  _write(level, message, userId = null) {
    const timestamp = new Date().toISOString();
    const userPart = userId ? ` [User: ${userId}]` : "";
    const logEntry = `[${timestamp}] [${level.toUpperCase()}]${userPart}: ${message}\n`;

    // Write to file
    fs.appendFileSync(LOG_FILE, logEntry);

    // Also log to console in development
    if (process.env.NODE_ENV !== "production") {
      console.log(logEntry.trim());
    }
  }

  info(message, userId = null) {
    this._write("info", message, userId);
  }

  error(message, error = null, userId = null) {
    const errorMessage = error ? `${message} - ${error.stack || error.message || error}` : message;
    this._write("error", errorMessage, userId);
  }

  warn(message, userId = null) {
    this._write("warn", message, userId);
  }
}

export default new Logger();
