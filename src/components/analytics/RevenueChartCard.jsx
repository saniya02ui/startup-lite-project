import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

/**
 * Helper to format currency in Indian Rupees.
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Custom Tooltip component for the Revenue Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs">
        <p className="font-bold text-slate-200">{payload[0].payload.name} Revenue</p>
        <p className="mt-1 text-emerald-400 font-extrabold">{formatINR(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

/**
 * RevenueChartCard Component.
 * Displays won deal revenue monthly trends using an Area Chart.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Monthly revenue array data.
 */
export const RevenueChartCard = ({ data = [] }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Revenue Analytics</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">Won deal value contributions over the last 6 months</p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              {/* Premium Gradient for Area Fill */}
              <linearGradient id="revenueGreenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
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
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
              tickFormatter={(val) => val >= 100000 ? `₹${(val / 100000).toFixed(1)}L` : `₹${val}`}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#22C55E" 
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#revenueGreenGradient)"
              animationDuration={850}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChartCard;
