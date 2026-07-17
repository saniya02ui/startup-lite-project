import { validationResult } from 'express-validator';

/**
 * Validate middleware: Runs express-validator checks and formats errors if any exist.
 * @param {Array} validations - Array of express-validator rules
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations concurrently
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Collect errors
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors cleanly
    const extractedErrors = errors.array().map((err) => ({
      field: err.path, // 'path' is used in express-validator v7+
      message: err.msg,
    }));

    // Return 400 Bad Request with all validation errors
    return res.status(400).json({
      success: false,
      errors: extractedErrors
    });
  };
};
