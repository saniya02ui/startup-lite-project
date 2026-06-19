import React from "react";

/**
 * StatsCard component displays a summary metric.
 * 
 * @param {Object} props
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The main value to display.
 * @param {React.ReactNode} props.icon - Lucide React icon element.
 * @param {number} props.change - Percentage change compared to previous period.
 * @param {string} props.color - Tailwind text color class for the icon.
 */
const StatsCard = ({ title, value, icon, change, color }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg bg-opacity-10 bg-gray-100 dark:bg-gray-700 ${color}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <span
          className={`text-sm font-medium flex items-center ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">vs last month</p>
    </div>
  );
};

export default StatsCard;
