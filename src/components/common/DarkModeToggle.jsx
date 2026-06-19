import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DarkModeToggle Component.
 * Renders an animated toggle switch with Sun (light) and Moon (dark) icons.
 */
export const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      aria-label="Toggle application theme"
    >
      {/* Sliding track and toggle handle */}
      <div className="relative w-11 h-6 bg-gray-300 dark:bg-blue-600 rounded-full transition-colors duration-300 p-0.5 shadow-inner">
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ease-out ${
            isDarkMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        >
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 text-blue-600 animate-fade-in" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10 animate-fade-in" />
          )}
        </div>
      </div>
      
      {/* Visual Text Indicator */}
      <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline select-none">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
