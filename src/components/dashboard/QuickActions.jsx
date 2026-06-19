import React from "react";
import { Plus, Users, Download } from "lucide-react";

/**
 * QuickActions component provides common actions for the user on the dashboard.
 */
const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="flex flex-col space-y-3 mt-auto">
        {/* Add New Lead Action */}
        <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </button>
        
        {/* View All Leads Action */}
        <button className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors">
          <Users className="w-4 h-4 mr-2" />
          View All Leads
        </button>
        
        {/* Export Data Action */}
        <button className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-medium py-2.5 px-4 rounded-lg transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
