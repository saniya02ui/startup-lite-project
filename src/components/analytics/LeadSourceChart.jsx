import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * Custom Tooltip component for Lead Sources.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-750 text-xs">
        <p className="font-bold text-slate-205">{payload[0].payload.name}</p>
        <p className="mt-1 text-sky-400 font-extrabold">{payload[0].value} Leads</p>
      </div>
    );
  }
  return null;
};

/**
 * LeadSourceChart Component.
 * Visualizes lead acquisition sources in a horizontal bar chart format.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Lead sources dataset.
 */
export const LeadSourceChart = ({ data = [] }) => {
  // Take top sources or pad if empty
  const chartData = data.length > 0 ? data : [
    { name: 'Website', count: 0 },
    { name: 'Referral', count: 0 },
    { name: 'LinkedIn', count: 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-150 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Acquisition Channels</h3>
        <p className="text-xs text-slate-405 dark:text-slate-500">Breakdown of leads by acquisition channel source</p>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          >
            <defs>
              <linearGradient id="sourcesGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-slate-700" />
            
            <XAxis 
              type="number"
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }}
              allowDecimals={false}
            />
            
            <YAxis 
              dataKey="name"
              type="category"
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }}
              className="dark:fill-slate-350"
              width={85}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F1F5F9', opacity: 0.15 }} />
            
            <Bar 
              dataKey="count" 
              fill="url(#sourcesGradient)"
              radius={[0, 6, 6, 0]}
              maxBarSize={28}
              animationDuration={850}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  opacity={1.0 - index * 0.08} // Slight opacity gradient for ranked channels
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadSourceChart;
