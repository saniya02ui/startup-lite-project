import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

/**
 * Custom Tooltip component for the Bar Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs">
        <p className="font-bold text-slate-200">{payload[0].payload.name}</p>
        <p className="mt-1 text-blue-400 font-bold">{payload[0].value} Leads</p>
      </div>
    );
  }
  return null;
};

/**
 * BarChartCard Component.
 * Displays Monthly Lead Count trend over the last 6 months.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Month counts array data.
 */
export const BarChartCard = ({ data = [] }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Leads Acquisition</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Monthly new lead counts for the last 6 months</p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* Premium Gradient for Bar fill */}
              <linearGradient id="barBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.4} />
              </linearGradient>
            </defs>

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
              allowDecimals={false}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9', opacity: 0.15 }} />
            
            <Bar 
              dataKey="count" 
              fill="url(#barBlueGradient)" 
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
