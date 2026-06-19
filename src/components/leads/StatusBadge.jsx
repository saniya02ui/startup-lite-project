import React from 'react';

/**
 * StatusBadge component displays a pill-shaped badge indicating the lead's status.
 *
 * @param {Object} props
 * @param {string} props.status - The current status of the lead.
 */
const StatusBadge = ({ status }) => {
  // Mapping of status to Tailwind CSS color classes
  const statusStyles = {
    'New': 'bg-gray-100 text-gray-800 border-gray-200',
    'Contacted': 'bg-blue-100 text-blue-800 border-blue-200',
    'Meeting Scheduled': 'bg-purple-100 text-purple-800 border-purple-200',
    'Proposal Sent': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Won': 'bg-green-100 text-green-800 border-green-200',
    'Lost': 'bg-red-100 text-red-800 border-red-200',
  };

  // Default fallback style if status is unknown
  const defaultStyle = 'bg-gray-100 text-gray-800 border-gray-200';
  const badgeStyle = statusStyles[status] || defaultStyle;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeStyle}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
