import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

/**
 * Formats values in Indian Rupees.
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * ForecastCard Component.
 * Displays forecasted next month revenue, confidence score, and trend comparison.
 *
 * @param {Object} props - React props.
 * @param {Object} props.forecast - Forecast datasets containing predicted, confidence, and trend.
 */
export const ForecastCard = ({ forecast = { predicted: 0, confidence: 70, trend: 0 } }) => {
  const isPositive = forecast.trend >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[260px] justify-between relative group overflow-hidden">
      {/* Background glow animation */}
      <div className="absolute -left-10 -top-10 w-36 h-36 bg-emerald-50/30 dark:bg-emerald-950/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

      <div>
        {/* Header row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
              Revenue Forecast
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Predicted revenue for the upcoming month</p>
          </div>

          <div className="relative group/tooltip">
            <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 cursor-pointer" />
            <div className="absolute right-0 top-6 w-64 bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-xl text-[10px] leading-relaxed hidden group-hover/tooltip:block z-25 border border-slate-700">
              <p className="font-bold border-b border-slate-800 pb-1 mb-1">Methodology:</p>
              <p className="text-slate-400 font-medium mb-1.5">
                Calculated using the average won deal value over the last 6 months.
              </p>
              <p className="font-bold border-b border-slate-800 pb-1 mb-1">Confidence Score:</p>
              <p className="text-slate-400 font-medium">
                Derived from the monthly standard deviation and consistent lead frequencies. More historical months and stable volumes yield higher confidence ratings.
              </p>
            </div>
          </div>
        </div>

        {/* Prediction value */}
        <div className="mt-5 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight">
              {formatINR(forecast.predicted)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold ${
              isPositive 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {isPositive ? '+' : ''}{forecast.trend}%
            </span>
            <span className="text-[11px] text-slate-405 dark:text-slate-500 font-semibold">
              projected vs this month
            </span>
          </div>
        </div>
      </div>

      {/* Confidence Score Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400">Model Confidence:</span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">{forecast.confidence}%</span>
        </div>
        
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700" 
            style={{ width: `${forecast.confidence}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
