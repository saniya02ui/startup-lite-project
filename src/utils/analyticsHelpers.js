import { STATUS_COLORS } from '../constants/analyticsColors';

/**
 * Maps database status names to presentation status names.
 */
const STATUS_MAP = {
  'New': 'New',
  'Contacted': 'Contacted',
  'Meeting Scheduled': 'Meeting',
  'Meeting': 'Meeting',
  'Proposal Sent': 'Proposal',
  'Proposal': 'Proposal',
  'Won': 'Won',
  'Lost': 'Lost'
};

/**
 * Calculates lead status distribution with counts, percentages, and custom HEX colors.
 * Maps 'Meeting Scheduled' -> 'Meeting' and 'Proposal Sent' -> 'Proposal'.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of status objects formatted for the Pie Chart.
 */
export const getStatusDistribution = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const total = leads.length;

  const counts = {
    'New': 0,
    'Contacted': 0,
    'Meeting': 0,
    'Proposal': 0,
    'Won': 0,
    'Lost': 0
  };

  leads.forEach(lead => {
    if (!lead) return;
    const mappedStatus = STATUS_MAP[lead.status] || lead.status;
    if (counts[mappedStatus] !== undefined) {
      counts[mappedStatus]++;
    }
  });

  return Object.keys(counts).map(status => {
    const value = counts[status];
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return {
      name: status,
      value,
      percentage,
      color: STATUS_COLORS[status] || '#94A3B8'
    };
  });
};

/**
 * Groups lead acquisition count over the last 6 months.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of month objects for the Bar Chart.
 */
export const getMonthlyLeads = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const monthsData = [];
  const now = new Date();
  
  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsData.push({
      name: date.toLocaleString('default', { month: 'short' }),
      month: date.getMonth(),
      year: date.getFullYear(),
      count: 0
    });
  }

  leads.forEach(lead => {
    if (!lead || !lead.createdAt) return;
    const leadDate = new Date(lead.createdAt);
    const leadMonth = leadDate.getMonth();
    const leadYear = leadDate.getFullYear();

    const match = monthsData.find(m => m.month === leadMonth && m.year === leadYear);
    if (match) {
      match.count++;
    }
  });

  return monthsData.map(({ name, count }) => ({ name, count }));
};

/**
 * Calculates conversion rate (Won / Total) for each of the last 6 months based on creation date.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of month conversion rates for the Line Chart.
 */
export const getConversionByMonth = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const monthsData = [];
  const now = new Date();

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsData.push({
      name: date.toLocaleString('default', { month: 'short' }),
      month: date.getMonth(),
      year: date.getFullYear(),
      wonCount: 0,
      totalCount: 0
    });
  }

  leads.forEach(lead => {
    if (!lead || !lead.createdAt) return;
    const leadDate = new Date(lead.createdAt);
    const leadMonth = leadDate.getMonth();
    const leadYear = leadDate.getFullYear();

    const match = monthsData.find(m => m.month === leadMonth && m.year === leadYear);
    if (match) {
      match.totalCount++;
      if (lead.status === 'Won') {
        match.wonCount++;
      }
    }
  });

  return monthsData.map(m => ({
    name: m.name,
    rate: m.totalCount > 0 ? Math.round((m.wonCount / m.totalCount) * 100) : 0
  }));
};

/**
 * Calculates revenue by month (only Won deals, grouped by wonAt month) over the last 6 months.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of monthly revenue objects for the Area Chart.
 */
export const getRevenueByMonth = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const monthsData = [];
  const now = new Date();

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthsData.push({
      name: date.toLocaleString('default', { month: 'short' }),
      month: date.getMonth(),
      year: date.getFullYear(),
      revenue: 0
    });
  }

  leads.forEach(lead => {
    if (!lead || lead.status !== 'Won') return;
    const dateStr = lead.wonAt || lead.createdAt;
    if (!dateStr) return;
    
    const leadDate = new Date(dateStr);
    const leadMonth = leadDate.getMonth();
    const leadYear = leadDate.getFullYear();

    const match = monthsData.find(m => m.month === leadMonth && m.year === leadYear);
    if (match) {
      match.revenue += Number(lead.value) || 0;
    }
  });

  return monthsData.map(({ name, revenue }) => ({ name, revenue }));
};

/**
 * Calculates the pipeline value (sum of active leads value, i.e., status is NOT Won or Lost).
 * 
 * @param {Array} leads - List of all leads.
 * @returns {number} Pipeline value.
 */
export const getPipelineValue = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter(lead => lead && lead.status !== 'Won' && lead.status !== 'Lost')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

/**
 * Calculates won revenue (sum of value of leads with Won status).
 * 
 * @param {Array} leads - List of all leads.
 * @returns {number} Total won revenue.
 */
export const getWonRevenue = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter(lead => lead && lead.status === 'Won')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

/**
 * Calculates average sales cycle length in days for closed Won leads.
 * Formula: wonAt - createdAt.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {number} Average days to close.
 */
export const getAverageSalesCycle = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  const wonLeads = leads.filter(lead => lead && lead.status === 'Won' && lead.createdAt && lead.wonAt);
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, lead) => {
    const start = new Date(lead.createdAt);
    const end = new Date(lead.wonAt);
    const diffTime = Math.max(0, end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);

  return parseFloat((totalDays / wonLeads.length).toFixed(1));
};

/**
 * Calculates the lost rate.
 * Formula: Lost Leads / Total Leads.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {number} Lost rate percentage.
 */
export const getLostRate = (leads = []) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const lostCount = leads.filter(lead => lead && lead.status === 'Lost').length;
  return Math.round((lostCount / leads.length) * 100);
};

/**
 * Groups and counts leads by acquisition channel (source), sorting descending.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} Source stats objects for LeadSourceChart.
 */
export const getLeadSourceStats = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const counts = {};

  leads.forEach(lead => {
    if (!lead) return;
    const src = lead.source || 'Other';
    counts[src] = (counts[src] || 0) + 1;
  });

  return Object.keys(counts)
    .map(source => ({
      name: source,
      count: counts[source]
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Computes stages, counts, and conversion metrics for the sales funnel.
 * Progression: New -> Contacted -> Meeting Scheduled (Meeting) -> Proposal Sent (Proposal) -> Won.
 * Cumulative logic: leads that reach later stages are counted in earlier stages.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} Funnel stage objects.
 */
export const getFunnelData = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  
  let newCount = 0;
  let contactedCount = 0;
  let meetingCount = 0;
  let proposalCount = 0;
  let wonCount = 0;

  leads.forEach(lead => {
    if (!lead) return;
    const hasWon = lead.status === 'Won' || lead.wonAt;
    const hasProposal = hasWon || lead.status === 'Proposal Sent' || lead.status === 'Proposal' || lead.proposalAt;
    const hasMeeting = hasProposal || lead.status === 'Meeting Scheduled' || lead.status === 'Meeting' || lead.meetingAt;
    const hasContacted = hasMeeting || lead.status === 'Contacted' || lead.contactedAt;
    
    newCount++; // All leads start as New
    if (hasContacted) contactedCount++;
    if (hasMeeting) meetingCount++;
    if (hasProposal) proposalCount++;
    if (hasWon) wonCount++;
  });

  const stages = [
    { stage: 'New', count: newCount, stepVal: 5 },
    { stage: 'Contacted', count: contactedCount, stepVal: 4 },
    { stage: 'Meeting', count: meetingCount, stepVal: 3 },
    { stage: 'Proposal', count: proposalCount, stepVal: 2 },
    { stage: 'Won', count: wonCount, stepVal: 1 }
  ];

  return stages.map((item, idx) => {
    const prevItem = idx > 0 ? stages[idx - 1] : null;
    const conversion = newCount > 0 ? Math.round((item.count / newCount) * 100) : 0;
    const stepConversion = (prevItem && prevItem.count > 0) ? Math.round((item.count / prevItem.count) * 100) : 100;
    const dropOff = 100 - conversion;
    
    return {
      name: item.stage,
      value: item.count,
      conversion,
      stepConversion,
      dropOff,
      stepVal: item.stepVal
    };
  });
};

/**
 * Calculates sales velocity (revenue per day).
 * Formula: (Opportunities * Win Rate * Avg Deal Size) / Sales Cycle Length.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {number} Sales velocity in ₹/day.
 */
export const getSalesVelocity = (leads = []) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  
  const cycle = getAverageSalesCycle(leads) || 14; // Default to 14 days if avg sales cycle is 0
  const opps = leads.filter(lead => lead && lead.status !== 'Won' && lead.status !== 'Lost').length;
  const wonLeads = leads.filter(lead => lead && lead.status === 'Won');
  const winRate = leads.length > 0 ? (wonLeads.length / leads.length) : 0;
  
  const avgDealSize = wonLeads.length > 0
    ? (wonLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0) / wonLeads.length)
    : (leads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0) / leads.length);

  const velocity = (opps * winRate * avgDealSize) / cycle;
  return Math.round(velocity);
};

/**
 * Forecasts the next month's revenue based on average won revenue of the last 6 months.
 * Also computes a confidence score and a growth trend.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Object} Forecast object.
 */
export const getForecastRevenue = (leads = []) => {
  if (!Array.isArray(leads)) return { predicted: 0, confidence: 50, trend: 0 };
  
  const monthlyRevenueData = getRevenueByMonth(leads); // Last 6 months revenues
  const totalRev = monthlyRevenueData.reduce((sum, m) => sum + m.revenue, 0);
  const predicted = Math.round(totalRev / 6);

  // Confidence calculation based on data quantity & revenue stability (coefficient of variation)
  const nonZeroMonths = monthlyRevenueData.filter(m => m.revenue > 0).length;
  let confidence = 50; // base confidence
  
  if (nonZeroMonths > 0) {
    const mean = totalRev / 6;
    const variance = monthlyRevenueData.reduce((sum, m) => sum + Math.pow(m.revenue - mean, 2), 0) / 6;
    const stdDev = Math.sqrt(variance);
    
    // lower standard deviation relative to mean -> higher confidence
    const cv = mean > 0 ? stdDev / mean : 1;
    const consistencyFactor = Math.max(0, 1 - cv) * 35; // max 35 points for consistency
    const volumeFactor = Math.min(6, nonZeroMonths) * 7.5; // max 45 points for historical months
    confidence = Math.round(15 + consistencyFactor + volumeFactor); // base 15 + max 80 = 95 max
  }
  
  // Growth trend comparing current forecast vs the last month's revenue
  const lastMonthRevenue = monthlyRevenueData[monthlyRevenueData.length - 1]?.revenue || 0;
  const trend = lastMonthRevenue > 0
    ? Math.round(((predicted - lastMonthRevenue) / lastMonthRevenue) * 100)
    : predicted > 0 ? 100 : 0;

  return {
    predicted,
    confidence: Math.max(30, Math.min(95, confidence)), // cap between 30% and 95%
    trend
  };
};

/**
 * Groups won leads by owner and calculates their total revenue contribution.
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of performers sorted descending.
 */
export const getTopPerformers = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const repData = {};

  leads.forEach(lead => {
    if (!lead || lead.status !== 'Won') return;
    const rep = lead.owner || 'Unassigned';
    if (!repData[rep]) {
      repData[rep] = { owner: rep, value: 0, leadsCount: 0 };
    }
    repData[rep].value += Number(lead.value) || 0;
    repData[rep].leadsCount++;
  });

  return Object.values(repData)
    .sort((a, b) => b.value - a.value);
};

/**
 * Gathers dates of activity from various lead timestamp milestones
 * (created, contacted, meeting, proposal, won).
 * 
 * @param {Array} leads - List of all leads.
 * @returns {Array} List of activity counts by date.
 */
export const getActivityHeatmapData = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const activityMap = {};

  const addActivity = (dateString, type) => {
    if (!dateString) return;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return;
    
    // Normalize date to YYYY-MM-DD
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateKey = `${yyyy}-${mm}-${dd}`;

    if (!activityMap[dateKey]) {
      activityMap[dateKey] = { date: dateKey, count: 0, created: 0, contacted: 0, meeting: 0, proposal: 0, won: 0 };
    }
    
    activityMap[dateKey].count++;
    activityMap[dateKey][type]++;
  };

  leads.forEach(lead => {
    if (!lead) return;
    addActivity(lead.createdAt, 'created');
    addActivity(lead.contactedAt, 'contacted');
    addActivity(lead.meetingAt, 'meeting');
    addActivity(lead.proposalAt, 'proposal');
    addActivity(lead.wonAt, 'won');
  });

  return Object.values(activityMap);
};
