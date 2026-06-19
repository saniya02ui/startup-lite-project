import React from 'react';
import { Search, Inbox } from 'lucide-react';

/**
 * EmptyState component displays a friendly illustration and message when
 * no data is available. It differentiates between having zero leads total
 * and having zero leads matching the search/filter criteria.
 *
 * @param {Object} props
 * @param {boolean} props.isFiltering - True if search or status filter is actively applied.
 * @param {Function} props.onClearFilters - Callback to clear search inputs and reset filters.
 */
const EmptyState = ({ isFiltering, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[320px] transition-all duration-200 animate-fade-in">
      {/* Icon Wrapper */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-550 dark:text-blue-400 mb-5">
        {isFiltering ? (
          <Search className="w-8 h-8" />
        ) : (
          <Inbox className="w-8 h-8" />
        )}
      </div>

      {/* Message Header */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {isFiltering ? 'No leads match your search' : 'No leads available'}
      </h3>

      {/* Message Body */}
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-6 leading-relaxed">
        {isFiltering
          ? 'We couldn\'t find any leads matching your current search terms or status filters. Try refining your keywords or resetting the filters.'
          : 'Your lead database is currently empty. Get started by clicking the "Add Lead" button to create your first client contact.'}
      </p>

      {/* Action Button */}
      {isFiltering && (
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-905/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold py-2.5 px-5 rounded-lg border border-blue-100 dark:border-blue-800 hover:border-blue-200 dark:hover:border-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm shadow-sm cursor-pointer"
        >
          Clear Filters & Search
        </button>
      )}
    </div>
  );
};

export default EmptyState;
