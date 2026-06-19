import React from 'react';
import { Mail, Phone, Edit2, Trash2, Building } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadCard component displays a single lead in a card format (primarily for mobile view).
 *
 * @param {Object} props
 * @param {Object} props.lead - The lead object containing details.
 * @param {Function} props.onEdit - Callback function when edit button is clicked.
 * @param {Function} props.onDelete - Callback function when delete button is clicked.
 */
const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Building className="w-4 h-4 mr-1.5" />
            {lead.company}
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">
            {lead.email}
          </a>
        </div>
        {lead.phone && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">
              {lead.phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onEdit(lead)}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer"
          aria-label={`Edit ${lead.name}`}
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 cursor-pointer"
          aria-label={`Delete ${lead.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LeadCard;
