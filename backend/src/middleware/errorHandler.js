const logger = require('./logger');
const { formatErrorResponse } = require('../utils/errorMessages');

/**
 * Global Error Handling Middleware
 * Catch all errors in the application, log them, and send a user-friendly JSON error response
 * @param {Error} err - Error object
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the full error for internal debugging
  logger.error(`${err.name}: ${err.message}\nStack: ${err.stack}`);

  // Determine error status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Format the user-friendly error response
  const errorResponse = formatErrorResponse(err, req);

  // Send the response
  res.status(err.status || statusCode).json(errorResponse);
};

module.exports = errorHandler;
