import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Custom Tooltip component for the Pie Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1">
        <p className="font-bold text-slate-200">{data.name}</p>
        <p className="text-sky-400 font-semibold">{data.value} Leads</p>
        <p className="text-slate-400 font-medium">{data.percentage}%</p>
      </div>
    );
  }
  return null;
};

/**
 * PieChartCard Component.
 * Renders lead status distribution in a Doughnut Chart.
 * Includes interactive hover effects, total in center, and custom legend.
 */
export const PieChartCard = ({ data = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const totalLeads = data.reduce((sum, item) => sum + item.value, 0);

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Lead Distribution</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Pipeline stage distribution of current leads</p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-0">
        {/* Pie Chart Container */}
        <div className="w-full sm:w-1/2 h-[220px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                animationDuration={600}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {data.map((entry, index) => {
                  const isHovered = activeIndex === index;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={isHovered ? entry.color : 'none'}
                      strokeWidth={isHovered ? 2 : 0}
                      className="transition-all duration-300 outline-none"
                      style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: '50% 50%',
                        cursor: 'pointer'
                      }}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Total Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 transition-all duration-300">
              {activeIndex !== null ? data[activeIndex]?.value : totalLeads}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-500 font-bold transition-all duration-355">
              {activeIndex !== null ? data[activeIndex]?.name : 'Total Leads'}
            </span>
          </div>
        </div>

        {/* Custom Rich Side Legend */}
        <div className="w-full sm:w-1/2 overflow-y-auto max-h-[220px] pr-2 space-y-2">
          {data.map((item, index) => {
            const isHovered = activeIndex === index;
            return (
              <div 
                key={item.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center justify-between text-sm py-2 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  isHovered 
                    ? 'bg-gray-50 dark:bg-slate-700/60 shadow-sm border-l-4 border-l-blue-500 pl-2' 
                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/30'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span 
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm border border-white dark:border-slate-800" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {item.value}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
