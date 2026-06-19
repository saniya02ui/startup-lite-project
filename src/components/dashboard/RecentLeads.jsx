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
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-yellow-100 text-yellow-700",
      qualified: "bg-green-100 text-green-700",
      lost: "bg-red-100 text-red-700",
    };
    
    const style = statusStyles[(status || "new").toLowerCase()] || "bg-gray-100 text-gray-700";
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentLeads.map((lead, index) => (
              <tr key={lead.id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{lead.name}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{lead.company}</td>
                <td className="px-6 py-4">{renderStatusBadge(lead.status)}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{lead.dateAdded}</td>
              </tr>
            ))}
            {recentLeads.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
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
