import React from 'react';
import { Users, TrendingUp, DollarSign, Award, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * Formats currency in Indian Rupees.
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Helper to render trend indicators.
 */
const TrendIndicator = ({ value, prefix = '', suffix = '%' }) => {
  if (value === 0) return null;
  const isPositive = value > 0;
  
  return (
    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold ${
      isPositive 
        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
    }`}>
      {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
      {isPositive ? '+' : ''}{value}{suffix}
    </span>
  );
};

/**
 * StatsCards Component.
 * Displays 6 KPI cards summary dashboard metrics.
 *
 * @param {Object} props - React props.
 * @param {Object} props.kpis - KPI data containing value and growth structures.
 */
export const StatsCards = ({ kpis = {} }) => {
  const {
    totalLeads = { value: 0, growth: 0 },
    conversionRate = { value: 0, growth: 0 },
    pipelineValue = { value: 0 },
    wonRevenue = { value: 0 },
    avgSalesCycle = { value: 0 },
    lostRate = { value: 0 }
  } = kpis;

  const cardConfig = [
    {
      title: 'Total Leads',
      value: totalLeads.value,
      icon: Users,
      colorClass: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/35',
      trend: <TrendIndicator value={totalLeads.growth} suffix="% vs last period" />,
      subtext: 'Leads created this period'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate.value}%`,
      icon: TrendingUp,
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/35',
      trend: <TrendIndicator value={conversionRate.growth} suffix=" pts vs last period" />,
      subtext: 'Won / Total Leads'
    },
    {
      title: 'Pipeline Value',
      value: formatINR(pipelineValue.value),
      icon: DollarSign,
      colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/35',
      trend: null,
      subtext: 'Active pipeline prospects'
    },
    {
      title: 'Won Revenue',
      value: formatINR(wonRevenue.value),
      icon: Award,
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/35',
      trend: null,
      subtext: 'Sum of all won deals'
    },
    {
      title: 'Average Sales Cycle',
      value: `${avgSalesCycle.value} Days`,
      icon: Clock,
      colorClass: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/35',
      trend: null,
      subtext: 'Lead creation to Won stage'
    },
    {
      title: 'Lost Rate',
      value: `${lostRate.value}%`,
      icon: AlertTriangle,
      colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/35',
      trend: null,
      subtext: 'Lost / Total Leads'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
      {cardConfig.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Header row */}
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${card.colorClass}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Value block */}
            <div className="mt-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                {card.value}
              </h3>
              
              {/* Footer details/trends */}
              <div className="mt-2.5 flex flex-col gap-1 min-h-[32px] justify-end">
                {card.trend ? (
                  card.trend
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {card.subtext}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
