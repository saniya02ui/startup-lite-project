import React from 'react';

/**
 * FilterBar component renders a row of interactive filter buttons representing
 * various lead statuses (All, New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost).
 *
 * @param {Object} props
 * @param {string} props.activeFilter - The currently selected filter status.
 * @param {Function} props.onFilterChange - Callback when a filter button is clicked.
 * @param {Array} props.leads - Array of lead objects used to count occurrences of each status.
 */
const FilterBar = ({ activeFilter, onFilterChange, leads = [] }) => {
  const filterOptions = [
    'All',
    'New',
    'Contacted',
    'Meeting Scheduled',
    'Proposal Sent',
    'Won',
    'Lost'
  ];

  // Calculate the total number of leads that match a specific status
  const getCountForFilter = (status) => {
    if (status === 'All') {
      return leads.length;
    }
    return leads.filter((lead) => lead.status === status).length;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 -my-1 scrollbar-none">
      {filterOptions.map((option) => {
        const isActive = activeFilter === option;
        const count = getCountForFilter(option);

        return (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-100 dark:shadow-none border border-transparent'
                : 'bg-white dark:bg-gray-805 text-gray-650 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-202 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-650'
            }`}
          >
            <span>{option}</span>
            <span
              className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-blue-700 text-blue-100'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
