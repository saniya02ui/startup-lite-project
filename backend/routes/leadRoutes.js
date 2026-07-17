import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  searchLeads
} from '../controllers/leadController.js';

const router = express.Router();

const validStatuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const validSources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

// Validation rules for creating/updating leads
const leadValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company is required'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  body('status')
    .optional()
    .isIn(validStatuses).withMessage(`Status must be one of: ${validStatuses.join(', ')}`),
  body('source')
    .optional()
    .isIn(validSources).withMessage(`Source must be one of: ${validSources.join(', ')}`)
];

// Apply protect middleware to ALL routes in this file
router.use(protect);

// ==========================================
// Analytics & Search Routes
// Must be defined before /:id routes
// ==========================================
router.get('/analytics/stats', getLeadStats);
router.get('/analytics/monthly', getMonthlyStats);
router.get('/search', searchLeads);

// ==========================================
// Standard CRUD Routes
// ==========================================
router.route('/')
  .get(getLeads)
  .post(validate(leadValidation), createLead);

router.route('/:id')
  .get(getLeadById)
  .put(validate(leadValidation), updateLead)
  .delete(deleteLead);

router.patch('/:id/status', updateLeadStatus);

export default router;
