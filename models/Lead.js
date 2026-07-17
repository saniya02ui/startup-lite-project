import mongoose from 'mongoose';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Mongoose Schema for the Lead model.
 */
export const leadSchema = new mongoose.Schema({
  /**
   * The lead's full name.
   */
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  /**
   * The company the lead belongs to.
   */
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  /**
   * The lead's email address.
   */
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [emailRegex, 'Email must be a valid email address']
  },
  /**
   * The lead's phone number.
   */
  phone: {
    type: String,
    trim: true
  },
  /**
   * The current status of the lead in the pipeline.
   */
  status: {
    type: String,
    enum: {
      values: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
      message: '{VALUE} is not a valid status'
    },
    default: 'New'
  },
  /**
   * The source from which the lead was acquired.
   */
  source: {
    type: String,
    enum: {
      values: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'],
      message: '{VALUE} is not a valid source'
    },
    default: 'Website'
  },
  /**
   * Additional notes about the lead.
   */
  notes: {
    type: String,
    maxLength: [1000, 'Notes cannot exceed 1000 characters']
  },
  /**
   * The user who owns or created this lead.
   */
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for age
leadSchema.virtual('age').get(function() {
  if (!this.createdAt) return 0;
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes
leadSchema.index({ owner: 1, status: 1 });
leadSchema.index({ email: 1 });

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
