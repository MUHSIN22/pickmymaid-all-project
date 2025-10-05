import winston from "winston";
import path from "path";
import { format } from "winston";

// Define log file paths
const logFilePath = path.join(__dirname, "../logs/app.log");
const errorLogFilePath = path.join(__dirname, "../logs/error.log");

// Custom formatter to include stack trace and source information
const customFormat = format((info) => {
  if (info instanceof Error) {
    // Attach stack trace to the log
    info.message = `${info.message}\nStack trace:\n${info.stack}`;
  }
  return info;
});

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat(),
    format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    }),
    new winston.transports.File({ filename: logFilePath }),
    new winston.transports.File({ filename: errorLogFilePath, level: "error" }),
  ],
});

// Helper function to log error with source context
export const logErrorWithSource = (error: any, meta: any) => {
  const errorDetails:any = {
    message: error.message || "Unknown error",
    stack: error.stack || "No stack trace available",
    timestamp: new Date().toISOString(),
  };

  // Extract source details (file name, line, and column) from the stack trace
  if (error.stack) {
    const stackLines = error.stack.split("\n");
    if (stackLines.length > 1) {
      const sourceMatch = stackLines[1].match(/\((.*):(\d+):(\d+)\)/); // Extract file, line, column
      if (sourceMatch) {
        errorDetails.file = sourceMatch[1];
        errorDetails.line = sourceMatch[2];
        errorDetails.column = sourceMatch[3];
      }
    }
  }

  logger.error(errorDetails, meta);
};

export default logger;
