import React from 'react';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from './common/DarkModeToggle';

/**
 * Navbar Component.
 * Top header bar that displays application routing title context and holds the DarkModeToggle.
 */
export const Navbar = () => {
  const location = useLocation();

  // Determine current page context/title based on route path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard Overview';
      case '/leads':
        return 'Lead Management';
      case '/analytics':
        return 'Analytics & Insights';
      default:
        return 'Startup CRM';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200 shadow-sm">
      {/* Page Context Breadcrumb / Title */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 select-none">
          {getPageTitle()}
        </h2>
      </div>

      {/* Action panel holding DarkModeToggle */}
      <div className="flex items-center gap-4">
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
