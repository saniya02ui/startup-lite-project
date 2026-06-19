import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

/**
 * Custom Tooltip component for the Line Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs">
        <p className="font-bold text-slate-200">{payload[0].payload.name}</p>
        <p className="mt-1 text-emerald-500 font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

/**
 * LineChartCard Component.
 * Displays Conversion Rate trend (Won / Total leads) over the last 6 months.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Month conversion rates array data.
 */
export const LineChartCard = ({ data = [] }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Monthly Conversion Trend</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Won deals relative to total leads created per month</p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#E2E8F0'} />
            
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
              domain={[0, 100]}
              tickFormatter={(tick) => `${tick}%`}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#22C55E" 
              strokeWidth={3}
              dot={{ stroke: '#22C55E', strokeWidth: 2.5, fill: isDarkMode ? '#1E293B' : '#FFFFFF', r: 4.5, activeDot: { r: 6.5 } }}
              activeDot={{ r: 6.5, strokeWidth: 0, fill: '#22C55E' }}
              animationDuration={800}
            >
              <LabelList 
                dataKey="rate" 
                formatter={(val) => `${val}%`} 
                position="top"
                style={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
