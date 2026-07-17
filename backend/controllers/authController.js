import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

/**
 * Helper to generate JWT token
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'Email already exists', 409);
    }

    // Create new User document (password hashed automatically in pre-save middleware)
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Return 201 with token and user object (password is stripped via toJSON in the model)
    return successResponse(res, { token, user }, 'User registered successfully', 201);
  } catch (error) {
    next(error); // Passes error to the global errorHandler
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // NOTE FOR PRODUCTION: Add express-rate-limit middleware to this route
    // to prevent brute force login attacks.

    // Find user by email and explicitly pull in the password field for comparison
    const user = await User.findOne({ email }).select('+password');
    
    // If user not found, throw generic 401
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Verify password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401);
    }

    // Verify account is active
    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated', 403);
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return 200 with token and user (password is stripped out automatically)
    return successResponse(res, { token, user }, 'Login successful', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged in user's profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user is already populated by the protect middleware
    return successResponse(res, { user: req.user }, 'Profile fetched successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;

    // Retrieve full user instance including password to verify oldPassword
    const user = await User.findById(req.user._id).select('+password');

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update password if requested
    if (newPassword) {
      if (!oldPassword) {
        return errorResponse(res, 'Please provide your current password to set a new password', 400);
      }

      // Verify current password
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return errorResponse(res, 'Invalid current password', 400);
      }

      user.password = newPassword;
    }

    // Save changes
    await user.save();

    return successResponse(res, { user }, 'Profile updated successfully', 200);
  } catch (error) {
    next(error);
  }
};
