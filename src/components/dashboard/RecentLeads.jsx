import React from "react";

/**
 * RecentLeads component displays a table of the most recently added leads.
 * 
 * @param {Object} props
 * @param {Array} props.leads - Array of lead objects.
 */
const RecentLeads = ({ leads = [] }) => {
  // Get the last 5 leads (assuming they are ordered by date or we can just slice)
  const recentLeads = leads.slice(0, 5);

  // Helper function to render the appropriate status badge
  const renderStatusBadge = (status) => {
    const statusStyles = {
      new: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
      qualified: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      lost: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    };
    
    const style = statusStyles[(status || "new").toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Company</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentLeads.map((lead, index) => (
              <tr key={lead.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/35 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{lead.name}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{lead.company}</td>
                <td className="px-6 py-4">{renderStatusBadge(lead.status)}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                  {lead.dateAdded || (lead.createdAt && new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })) || ''}
                </td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
