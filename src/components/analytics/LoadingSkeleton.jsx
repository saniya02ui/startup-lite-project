import React from 'react';

/**
 * LoadingSkeleton Component.
 * Renders pulse-shimmer placeholders matching the dashboard layout structure.
 */
export const LoadingSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="space-y-2 w-48">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-full"></div>
        </div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-full sm:w-64"></div>
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            </div>
            <div className="h-7 bg-slate-300 dark:bg-slate-600 rounded w-2/3"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Row 1: Pie & Funnel Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/4"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 flex-1">
            <div className="w-40 h-40 rounded-full border-[16px] border-slate-200 dark:border-gray-700 flex items-center justify-center">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="space-y-3 w-full sm:w-1/3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        {/* Funnel Chart Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/4"></div>
          </div>
          <div className="space-y-4 flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4">
            <div className="h-10 bg-slate-300 dark:bg-slate-600 rounded-lg w-full"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-11/12 mx-auto"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6 mx-auto"></div>
            <div className="h-10 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-3/4 mx-auto"></div>
            <div className="h-10 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Row 2: Bar & Line Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/4"></div>
          </div>
          <div className="flex items-end justify-between gap-4 h-56 px-4">
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            <div className="h-44 bg-slate-300 dark:bg-slate-600 rounded w-12"></div>
            <div className="h-28 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
          </div>
        </div>

        {/* Line Chart Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-1/4"></div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <div className="w-full h-48 border-b-2 border-l-2 border-slate-200 dark:border-gray-700 relative">
              <svg className="absolute inset-0 w-full h-full text-slate-200 dark:text-slate-700" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,80 Q 25,20 50,50 T 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Revenue & Sources Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="h-56 bg-slate-100 dark:bg-slate-700/30 rounded-xl w-full"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[400px] space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="space-y-3 flex-1">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Heatmap & Top Performers Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[300px] space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="grid grid-cols-24 gap-1 h-36">
            {[...Array(120)].map((_, idx) => (
              <div key={idx} className="bg-slate-100 dark:bg-slate-700 rounded-sm w-3 h-3"></div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 h-[300px] space-y-4 flex flex-col justify-between">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
