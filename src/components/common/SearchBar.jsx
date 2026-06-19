import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component provides a styled, responsive search input.
 * It implements a 300ms debounce on user input before calling the onChange callback
 * to optimize rendering and query performance.
 *
 * @param {Object} props
 * @param {string} props.value - The parent search query value.
 * @param {Function} props.onChange - Callback function triggered with the updated search string (debounced).
 */
const SearchBar = ({ value, onChange }) => {
  // Maintain a local state for the input field to remain highly responsive
  const [localValue, setLocalValue] = useState(value);

  // Sync local state when the prop changes (e.g., when cleared externally)
  useEffect(() => {
    setLocalValue((prev) => (prev !== value ? value : prev));
  }, [value]);

  // Debounce the parent onChange callback
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value]);

  // Handle immediate clearing of input
  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative flex-1 min-w-[280px]">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        placeholder="Search by name, company, or email..."
        aria-label="Search leads by name, company, or email"
      />
      
      {/* Clear Button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          aria-label="Clear search query"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
