import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Plus } from 'lucide-react';

/**
 * EmptyAnalyticsState Component.
 * Renders when there are no leads in the CRM database.
 */
export const EmptyAnalyticsState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-150 dark:border-gray-700 shadow-xl text-center space-y-6 transform hover:scale-[1.01] transition-all duration-300">
        {/* Animated Icon Ring */}
        <div className="relative w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto group">
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl scale-0 group-hover:scale-110 transition-transform duration-300 -z-10 animate-ping opacity-25"></div>
          <BarChart3 className="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:rotate-6 transition-transform duration-300" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            No analytics available yet
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
            Add your first lead to start tracking business performance, pipeline progress, revenue forecasts, and team conversion metrics.
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            to="/leads"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyAnalyticsState;
