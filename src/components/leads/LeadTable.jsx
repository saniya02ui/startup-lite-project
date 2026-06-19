import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadTable component displays a table of all leads (primarily for desktop view).
 *
 * @param {Object} props
 * @param {Array} props.leads - Array of lead objects.
 * @param {Function} props.onEdit - Callback function when edit button is clicked.
 * @param {Function} props.onDelete - Callback function when delete button is clicked.
 */
const LeadTable = ({ leads, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm">
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Company</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Source</th>
              <th className="px-6 py-4 font-semibold">Date Added</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No leads found. Add a new lead to get started.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/35 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{lead.company}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{lead.source}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-450 text-sm">
                    {lead.dateAdded || (lead.createdAt && new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })) || ''}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 text-gray-400 hover:text-blue-650 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        aria-label={`Edit ${lead.name}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 text-gray-400 hover:text-red-650 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
