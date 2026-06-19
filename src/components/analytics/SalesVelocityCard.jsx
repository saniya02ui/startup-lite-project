import React from 'react';
import { Zap, ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';

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
 * SalesVelocityCard Component.
 * Displays Sales Velocity (Opportunities x Win Rate x Avg Deal Size) / Cycle Length.
 *
 * @param {Object} props - React props.
 * @param {Object} props.velocity - Velocity data containing value and growth structures.
 */
export const SalesVelocityCard = ({ velocity = { value: 0, growth: 0 } }) => {
  const isPositive = velocity.growth > 0;
  const isZero = velocity.growth === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-150 dark:border-gray-700 flex flex-col h-[260px] justify-between relative group overflow-hidden">
      {/* Dynamic background highlight */}
      <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-blue-50/30 dark:bg-blue-900/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

      <div>
        {/* Header row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-550" />
              Sales Velocity
            </h3>
            <p className="text-xs text-slate-405 dark:text-slate-500 mt-0.5">Speed at which leads generate revenue</p>
          </div>
          
          {/* Equation Formula Explanation */}
          <div className="relative group/tooltip">
            <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-655 dark:text-slate-500 cursor-pointer" />
            <div className="absolute right-0 top-6 w-64 bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-xl text-[10px] leading-relaxed hidden group-hover/tooltip:block z-25 border border-slate-750">
              <p className="font-bold border-b border-slate-800 pb-1 mb-1">Formula:</p>
              <code className="text-amber-400 block mb-1.5 font-mono">
                (Opps × Win Rate × Avg Deal) ÷ Cycle
              </code>
              <p className="text-slate-400 font-medium">
                Measures how much revenue is flowing through your sales funnel per day. Higher numbers indicate faster, more valuable close rates.
              </p>
            </div>
          </div>
        </div>

        {/* Value metrics */}
        <div className="mt-6 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-850 dark:text-slate-100 tracking-tight">
              {formatINR(velocity.value)}
            </span>
            <span className="text-sm font-bold text-slate-450 dark:text-slate-500">/day</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            {!isZero && (
              <span className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-xl text-xs font-extrabold ${
                isPositive 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-955/30 dark:text-rose-400'
              }`}>
                {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {isPositive ? '+' : ''}{velocity.growth}%
              </span>
            )}
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              compared to previous period
            </span>
          </div>
        </div>
      </div>

      {/* Progress status bar */}
      <div className="bg-gray-50 dark:bg-gray-900/30 p-3 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-505 dark:text-slate-450">Funnel Flow Rating:</span>
        <span className={`font-bold ${
          velocity.value > 25000 
            ? 'text-emerald-600 dark:text-emerald-400' 
            : velocity.value > 10000 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-amber-500'
        }`}>
          {velocity.value > 25000 ? 'High Speed 🔥' : velocity.value > 10000 ? 'Steady Progress ⚡' : 'Moderate Flow 📉'}
        </span>
      </div>
    </div>
  );
};

export default SalesVelocityCard;
