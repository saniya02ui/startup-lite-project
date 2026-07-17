/**
 * Helper for successful API responses
 * @param {Object} res - Express response object
 * @param {any} data - Data to send back
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Helper for error API responses
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {any} errors - Additional error details
 */
export const errorResponse = (res, message = 'Server Error', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

/**
 * Helper for paginated API responses
 * @param {Object} res - Express response object
 * @param {any} data - Paginated data array
 * @param {number} total - Total number of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};
