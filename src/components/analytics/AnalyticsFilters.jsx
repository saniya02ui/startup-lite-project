import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * AnalyticsFilters Component.
 * Provides preset buttons and custom date inputs to adjust the reporting timeline.
 *
 * @param {Object} props - React props.
 * @param {string} props.filterType - Currently selected filter type.
 * @param {function} props.onFilterChange - Callback when filter type changes.
 * @param {Object} props.customRange - Start and end dates for custom filter.
 * @param {function} props.onCustomRangeChange - Callback when custom dates change.
 */
export const AnalyticsFilters = ({
  filterType,
  onFilterChange,
  customRange,
  onCustomRangeChange
}) => {
  const presets = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const handleStartDateChange = (e) => {
    onCustomRangeChange({
      ...customRange,
      startDate: e.target.value
    });
  };

  const handleEndDateChange = (e) => {
    onCustomRangeChange({
      ...customRange,
      endDate: e.target.value
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Title */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Performance Range
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Select a timeline to filter sales activity metrics.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 gap-1">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onFilterChange(preset.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                filterType === preset.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-650 dark:text-slate-400 hover:text-slate-800 hover:bg-slate-105 dark:hover:bg-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom range dates input fields */}
      {filterType === 'custom' && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Start Date
            </label>
            <input
              type="date"
              value={customRange.startDate}
              onChange={handleStartDateChange}
              max={customRange.endDate || undefined}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              End Date
            </label>
            <input
              type="date"
              value={customRange.endDate}
              onChange={handleEndDateChange}
              min={customRange.startDate || undefined}
              className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsFilters;
