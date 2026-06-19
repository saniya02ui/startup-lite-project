import { useState, useEffect, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData
} from '../utils/analyticsHelpers';

/**
 * Custom React Hook for Managing Dashboard Analytics State.
 * Filters CRM data by date and returns memoized aggregates, growth trends, and chart datasets.
 */
export const useAnalytics = () => {
  const { leads = [] } = useLeads();
  const [filterType, setFilterType] = useState('30d'); // '7d', '30d', '90d', 'year', 'custom'
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state briefly when filter changes to showcase shimmer skeletons
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [filterType, customRange]);

  // Determine current and previous date ranges
  const dateRanges = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let currentStart = new Date();
    let currentEnd = new Date(today.getTime() + (24 * 60 * 60 * 1000) - 1); // end of today
    
    let prevStart = new Date();
    let prevEnd = new Date();

    switch (filterType) {
      case '7d':
        currentStart = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
        prevStart = new Date(currentStart.getTime() - (7 * 24 * 60 * 60 * 1000));
        prevEnd = new Date(currentStart.getTime() - 1);
        break;
      
      case '90d':
        currentStart = new Date(today.getTime() - (90 * 24 * 60 * 60 * 1000));
        prevStart = new Date(currentStart.getTime() - (90 * 24 * 60 * 60 * 1000));
        prevEnd = new Date(currentStart.getTime() - 1);
        break;

      case 'year':
        currentStart = new Date(now.getFullYear(), 0, 1);
        prevStart = new Date(now.getFullYear() - 1, 0, 1);
        prevEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59);
        break;

      case 'custom':
        if (customRange.startDate && customRange.endDate) {
          currentStart = new Date(customRange.startDate);
          // Set to end of day to be inclusive
          currentEnd = new Date(new Date(customRange.endDate).getTime() + (24 * 60 * 60 * 1000) - 1);
          
          const duration = currentEnd.getTime() - currentStart.getTime();
          prevStart = new Date(currentStart.getTime() - duration);
          prevEnd = new Date(currentStart.getTime() - 1);
        } else {
          // Default fallback to 30d if custom dates are incomplete
          currentStart = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
          prevStart = new Date(currentStart.getTime() - (30 * 24 * 60 * 60 * 1000));
          prevEnd = new Date(currentStart.getTime() - 1);
        }
        break;

      case '30d':
      default:
        currentStart = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        prevStart = new Date(currentStart.getTime() - (30 * 24 * 60 * 60 * 1000));
        prevEnd = new Date(currentStart.getTime() - 1);
        break;
    }

    return {
      currentStart,
      currentEnd,
      prevStart,
      prevEnd
    };
  }, [filterType, customRange]);

  // Filter leads for current period and previous period
  const { currentLeads, prevLeads } = useMemo(() => {
    const { currentStart, currentEnd, prevStart, prevEnd } = dateRanges;

    const current = [];
    const prev = [];

    leads.forEach(lead => {
      if (!lead || !lead.createdAt) return;
      const createdTime = new Date(lead.createdAt).getTime();

      if (createdTime >= currentStart.getTime() && createdTime <= currentEnd.getTime()) {
        current.push(lead);
      } else if (createdTime >= prevStart.getTime() && createdTime <= prevEnd.getTime()) {
        prev.push(lead);
      }
    });

    return { currentLeads: current, prevLeads: prev };
  }, [leads, dateRanges]);

  // Compute Memoized KPIs and Comparisons
  const kpis = useMemo(() => {
    // Current Period Stats
    const totalLeads = currentLeads.length;
    const wonCount = currentLeads.filter(l => l.status === 'Won').length;
    const conversionRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0;
    const pipelineValue = getPipelineValue(currentLeads);
    const wonRevenue = getWonRevenue(currentLeads);
    const avgSalesCycle = getAverageSalesCycle(currentLeads);
    const lostRate = getLostRate(currentLeads);

    // Previous Period Stats (for trend calculations)
    const prevTotalLeads = prevLeads.length;
    const prevWonCount = prevLeads.filter(l => l.status === 'Won').length;
    const prevConversionRate = prevTotalLeads > 0 ? Math.round((prevWonCount / prevTotalLeads) * 100) : 0;
    
    // Growth percentages
    const leadsGrowth = prevTotalLeads > 0
      ? Math.round(((totalLeads - prevTotalLeads) / prevTotalLeads) * 100)
      : totalLeads > 0 ? 100 : 0;

    const conversionGrowth = conversionRate - prevConversionRate; // simple absolute point change represents CRM standards better

    return {
      totalLeads: {
        value: totalLeads,
        growth: leadsGrowth,
      },
      conversionRate: {
        value: conversionRate,
        growth: conversionGrowth,
      },
      pipelineValue: {
        value: pipelineValue,
      },
      wonRevenue: {
        value: wonRevenue,
      },
      avgSalesCycle: {
        value: avgSalesCycle,
      },
      lostRate: {
        value: lostRate,
      }
    };
  }, [currentLeads, prevLeads]);

  // Compute Memoized Charts Datasets
  const chartsData = useMemo(() => {
    // We compute these aggregates from the filtered current leads list
    const statusData = getStatusDistribution(currentLeads);
    
    // Note: Monthly trends (monthly leads, conversion, revenue, forecasts) are calculated on the full
    // leads array to capture a broad, consistent 6-month chart context.
    const monthlyLeadsData = getMonthlyLeads(leads);
    const conversionData = getConversionByMonth(leads);
    const revenueData = getRevenueByMonth(leads);
    
    const sourceData = getLeadSourceStats(currentLeads);
    const funnelData = getFunnelData(currentLeads);
    const velocity = getSalesVelocity(currentLeads);
    
    // Velocity trend vs previous period
    const prevVelocity = getSalesVelocity(prevLeads);
    const velocityGrowth = prevVelocity > 0
      ? Math.round(((velocity - prevVelocity) / prevVelocity) * 100)
      : velocity > 0 ? 100 : 0;

    const forecast = getForecastRevenue(leads);
    const heatmapData = getActivityHeatmapData(currentLeads);
    const performers = getTopPerformers(currentLeads);

    return {
      statusData,
      monthlyLeadsData,
      conversionData,
      revenueData,
      sourceData,
      funnelData,
      velocity: {
        value: velocity,
        growth: velocityGrowth
      },
      forecast,
      heatmapData,
      performers
    };
  }, [leads, currentLeads, prevLeads]);

  return {
    filterType,
    setFilterType,
    customRange,
    setCustomRange,
    isLoading,
    kpis,
    chartsData,
    hasLeads: leads.length > 0
  };
};
