import React from "react";

/**
 * PipelineOverview component renders a visual horizontal bar representing lead statuses.
 * 
 * @param {Object} props
 * @param {Array} props.leads - Array of lead objects containing a 'status' field.
 */
const PipelineOverview = ({ leads = [] }) => {
  // Define available statuses and their corresponding Tailwind color classes
  const statusConfig = {
    'new': { label: "New", color: "bg-gray-400" },
    'contacted': { label: "Contacted", color: "bg-blue-500" },
    'meeting scheduled': { label: "Meeting Scheduled", color: "bg-purple-500" },
    'proposal sent': { label: "Proposal Sent", color: "bg-amber-500" },
    'won': { label: "Won", color: "bg-green-500" },
    'lost': { label: "Lost", color: "bg-red-500" },
  };

  // Calculate counts for each status
  const counts = leads.reduce((acc, lead) => {
    const status = (lead.status || "New").toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const totalLeads = leads.length || 1; // Prevent division by zero

  // Calculate percentages for the progress bar segments
  const segments = Object.entries(statusConfig).map(([key, config]) => {
    const count = counts[key] || 0;
    const percentage = (count / totalLeads) * 100;
    return { ...config, key, count, percentage };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all duration-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pipeline Overview</h3>
      
      {/* Horizontal Bar */}
      <div className="w-full h-4 flex rounded-full overflow-hidden mb-6 bg-gray-105 dark:bg-gray-700">
        {segments.map((segment) => (
          <div
            key={segment.key}
            style={{ width: `${segment.percentage}%` }}
            className={`${segment.color} transition-all duration-500`}
            title={`${segment.label}: ${segment.count}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {segments.map((segment) => (
          <div key={segment.key} className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${segment.color}`} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{segment.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{segment.count} Leads ({Math.round(segment.percentage)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineOverview;
