import React from "react";
import { Plus, Users, Download } from "lucide-react";

/**
 * QuickActions component provides common actions for the user on the dashboard.
 */
const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col h-full transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
      <div className="flex flex-col space-y-3 mt-auto">
        {/* Add New Lead Action */}
        <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </button>
        
        {/* View All Leads Action */}
        <button className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer">
          <Users className="w-4 h-4 mr-2" />
          View All Leads
        </button>
        
        {/* Export Data Action */}
        <button className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
