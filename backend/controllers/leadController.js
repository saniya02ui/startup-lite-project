import Lead from '../models/Lead.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/apiResponse.js';

/**
 * @desc    Get all leads for the logged-in user with advanced pagination, filtering, and searching
 * @route   GET /api/leads
 * @access  Private
 * @inputs  query params: status, search, source, dateFrom, dateTo, page, limit, sortBy, sortOrder
 * @outputs paginated object with leads array and pagination info (total, page, limit, pages, hasNext, hasPrev)
 * @side_effects none
 */
export const getLeads = async (req, res, next) => {
  try {
    const { 
      status, search, source, dateFrom, dateTo,
      page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' 
    } = req.query;

    const filter = { owner: req.user._id };

    if (status && status !== 'All') filter.status = status;
    if (source && source !== 'All') filter.source = source;

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { company: regex },
        { email: regex }
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const leads = await Lead.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber);

    const total = await Lead.countDocuments(filter);
    const pages = Math.ceil(total / limitNumber);

    return res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages,
        hasNext: pageNumber < pages,
        hasPrev: pageNumber > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new lead
 * @route   POST /api/leads
 * @access  Private
 * @inputs  req.body with lead fields
 * @outputs newly created lead
 * @side_effects creates a new Lead document in the DB linked to the user
 */
export const createLead = async (req, res, next) => {
  try {
    const newLead = await Lead.create({
      ...req.body,
      owner: req.user._id
    });

    return successResponse(res, newLead, 'Lead created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single lead by ID
 * @route   GET /api/leads/:id
 * @access  Private
 * @inputs  req.params.id
 * @outputs lead object
 * @side_effects none
 */
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a lead completely
 * @route   PUT /api/leads/:id
 * @access  Private
 * @inputs  req.params.id, req.body with updated lead fields
 * @outputs updated lead object
 * @side_effects modifies Lead document in DB
 */
export const updateLead = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    delete updateData.owner;

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update only the status of a lead
 * @route   PATCH /api/leads/:id/status
 * @access  Private
 * @inputs  req.params.id, req.body.status
 * @outputs updated lead object
 * @side_effects modifies status field of a Lead document in DB
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

    if (!validStatuses.includes(status)) {
      return errorResponse(res, 'Invalid status value', 400);
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    return successResponse(res, lead, 'Lead status updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a lead
 * @route   DELETE /api/leads/:id
 * @access  Private
 * @inputs  req.params.id
 * @outputs success message
 * @side_effects removes Lead document from DB
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });

    if (!lead) {
      return errorResponse(res, 'Lead not found', 404);
    }

    await lead.deleteOne();

    return successResponse(res, null, 'Lead deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get overall lead statistics using MongoDB Aggregation
 * @route   GET /api/leads/analytics/stats
 * @access  Private
 * @inputs  none
 * @outputs stats object (totalLeads, statusBreakdown, conversionRate, sourceBreakdown, thisMonthLeads, lastMonthLeads, growthRate)
 * @side_effects none
 */
export const getLeadStats = async (req, res, next) => {
  try {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const pipeline = [
      { $match: { owner: req.user._id } },
      {
        $facet: {
          totalAndStatus: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          sourceBreakdown: [
            { $group: { _id: '$source', count: { $sum: 1 } } }
          ],
          thisMonth: [
            { $match: { createdAt: { $gte: thisMonthStart } } },
            { $count: 'count' }
          ],
          lastMonth: [
            { $match: { createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } } },
            { $count: 'count' }
          ]
        }
      }
    ];

    const results = await Lead.aggregate(pipeline);
    const data = results[0];

    let totalLeads = 0;
    let wonLeads = 0;
    const statusBreakdown = {};
    const sourceBreakdown = {};

    data.totalAndStatus.forEach(item => {
      totalLeads += item.count;
      statusBreakdown[item._id] = item.count;
      if (item._id === 'Won') wonLeads = item.count;
    });

    data.sourceBreakdown.forEach(item => {
      sourceBreakdown[item._id] = item.count;
    });

    // Handle Division by zero
    const conversionRate = totalLeads > 0 ? Number(((wonLeads / totalLeads) * 100).toFixed(1)) : 0;
    
    const thisMonthLeads = data.thisMonth[0]?.count || 0;
    const lastMonthLeads = data.lastMonth[0]?.count || 0;
    
    let growthRate = 0;
    if (lastMonthLeads > 0) {
      growthRate = Number((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1));
    } else if (thisMonthLeads > 0) {
      growthRate = 100; // If last month was 0 and this month > 0, growth is effectively 100%
    }

    const stats = {
      totalLeads,
      statusBreakdown,
      conversionRate,
      sourceBreakdown,
      thisMonthLeads,
      lastMonthLeads,
      growthRate
    };

    return successResponse(res, stats, 'Lead stats retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get monthly aggregated stats (last 6 months) including months with zero leads
 * @route   GET /api/leads/analytics/monthly
 * @access  Private
 * @inputs  none
 * @outputs array of monthly stats [{ month, total, won, lost, conversionRate }]
 * @side_effects none
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    const sixMonthsAgo = new Date();
    // Go 5 months back so that the current month is the 6th
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); 
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const pipeline = [
      {
        $match: {
          owner: req.user._id,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          won: { $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] } },
          lost: { $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] } }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ];

    const results = await Lead.aggregate(pipeline);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formattedResults = [];
    const now = new Date();
    
    // Fill in array chronologically from left to right (oldest to newest)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const monthIndex = d.getMonth();
      
      const found = results.find(r => r._id.year === year && r._id.month === monthIndex + 1);
      
      const total = found ? found.total : 0;
      const won = found ? found.won : 0;
      const lost = found ? found.lost : 0;
      const conversionRate = total > 0 ? Number(((won / total) * 100).toFixed(1)) : 0;

      formattedResults.push({
        month: `${monthNames[monthIndex]} ${year}`,
        total,
        won,
        lost,
        conversionRate
      });
    }

    return successResponse(res, formattedResults, 'Monthly stats retrieved successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Quick search for autocomplete (limit 5)
 * @route   GET /api/leads/search
 * @access  Private
 * @inputs  query params: q (query string), limit
 * @outputs array of minimal lead objects (_id, name, company, email, status)
 * @side_effects none
 */
export const searchLeads = async (req, res, next) => {
  try {
    const { q, limit = 5 } = req.query;
    if (!q) {
      return successResponse(res, [], 'Empty query');
    }

    const regex = new RegExp(q, 'i');
    const limitNumber = parseInt(limit, 10);

    const leads = await Lead.find({
      owner: req.user._id,
      $or: [
        { name: regex },
        { company: regex },
        { email: regex }
      ]
    })
      .select('_id name company email status')
      .limit(limitNumber);

    return successResponse(res, leads, 'Search successful');
  } catch (error) {
    next(error);
  }
};
