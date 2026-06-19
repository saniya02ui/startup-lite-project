import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

/**
 * Advanced Analytics Dashboard Page.
 * Visualizes startup lead progression, CRM pipeline value, conversion trends,
 * revenue forecasts, activity heatmaps, and team performance metrics.
 */
export const Analytics = () => {
  const {
    filterType,
    setFilterType,
    customRange,
    setCustomRange,
    isLoading,
    kpis,
    chartsData,
    hasLeads
  } = useAnalytics();

  // If no leads exist at all in the system, show empty CTA state
  if (!hasLeads) {
    return (
      <div className="p-4 md:p-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <EmptyAnalyticsState />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen space-y-6 transition-colors duration-200">
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-850 dark:text-white tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
          Track sales performance, pipeline distribution, conversions, and growth forecasting.
        </p>
      </div>

      {/* Date timeline filter panel */}
      <AnalyticsFilters
        filterType={filterType}
        onFilterChange={setFilterType}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />

      {/* Conditional rendering for simulated load states */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* 6 KPI Cards Grid */}
          <StatsCards kpis={kpis} />

          {/* Section: Distribution & Funnel Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChartCard data={chartsData.statusData} />
            <FunnelChartCard data={chartsData.funnelData} />
          </div>

          {/* Section: Progression Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BarChartCard data={chartsData.monthlyLeadsData} />
            <LineChartCard data={chartsData.conversionData} />
          </div>

          {/* Section: Financial Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueChartCard data={chartsData.revenueData} />
            <LeadSourceChart data={chartsData.sourceData} />
          </div>

          {/* Section: Activity & Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityHeatmap data={chartsData.heatmapData} />
            </div>
            <div>
              <TopPerformersCard performers={chartsData.performers} />
            </div>
          </div>

          {/* Section: Forecasting & Efficiency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ForecastCard forecast={chartsData.forecast} />
            <SalesVelocityCard velocity={chartsData.velocity} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
