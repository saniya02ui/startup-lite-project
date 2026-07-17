/**
 * Global Error Handler Middleware
 * Catches all errors passed to next(err) and formats them into a consistent API response.
 */
export const errorHandler = (err, req, res, next) => {
  // If the status code is still 200, it means it's a server error. Otherwise use the existing status.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';
  let errors = null;

  // 1. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    // Extract field-by-field error messages
    errors = Object.values(err.errors).map(val => val.message);
  }

  // 2. Mongoose CastError (e.g. invalid ObjectId format)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // 3. MongoDB Duplicate Key Error (e.g. email already exists)
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Email already exists';
  }

  // 4. JWT Authentication Errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Not authorized, token failed or expired';
  }

  // Send the final error response
  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Only include stack trace in development mode for security
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
