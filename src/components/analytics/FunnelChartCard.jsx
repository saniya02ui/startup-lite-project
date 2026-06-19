import React from 'react';
import { FunnelChart, Funnel, Cell, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

/**
 * Custom Tooltip for Funnel Chart.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl shadow-xl border border-slate-750 text-xs space-y-1.5">
        <p className="font-bold text-slate-205">{data.name}</p>
        <p className="text-blue-400 font-bold">{data.value} Leads</p>
        <div className="flex flex-col gap-0.5 text-slate-400 font-medium pt-1 border-t border-slate-800">
          <p>Total Conversion: <span className="text-slate-200">{data.conversion}%</span></p>
          <p>Step Conversion: <span className="text-slate-200">{data.stepConversion}%</span></p>
          <p>Drop-off Rate: <span className="text-red-400">{data.dropOff}%</span></p>
        </div>
      </div>
    );
  }
  return null;
};

/**
 * FunnelChartCard Component.
 * Visualizes the sales conversion funnel with drop-off rates and counts.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Funnel stage datasets.
 */
export const FunnelChartCard = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-150 dark:border-gray-700 flex flex-col h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Sales Funnel</h3>
        <p className="text-xs text-slate-405 dark:text-slate-500">Pipeline progression and stage drop-off metrics</p>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-0">
        {/* Funnel Chart */}
        <div className="w-full sm:w-1/2 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <Tooltip content={<CustomTooltip />} />
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                animationDuration={600}
                labelKey="name"
              >
                <LabelList 
                  position="right" 
                  fill="#94A3B8" 
                  stroke="none" 
                  dataKey="name" 
                  style={{ fontSize: 10, fontWeight: 700 }}
                />
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={STATUS_COLORS[entry.name] || '#3B82F6'} 
                    opacity={0.85 - index * 0.12} // Gradient shading down the funnel
                  />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel Stats Column */}
        <div className="w-full sm:w-1/2 overflow-y-auto max-h-[240px] pr-2 space-y-2.5">
          {data.map((item, idx) => {
            const color = STATUS_COLORS[item.name] || '#3B82F6';
            return (
              <div 
                key={item.name}
                className="p-3 bg-gray-50 dark:bg-gray-900/35 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: color }} 
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-350">
                    {item.value} Leads
                  </span>
                </div>

                {/* Progress bar and details */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        backgroundColor: color, 
                        width: `${item.conversion}%` 
                      }} 
                    />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 shrink-0 w-24 text-right flex justify-between">
                    <span>Conv: {item.conversion}%</span>
                    {idx > 0 && <span className="text-red-400 ml-1">-{item.dropOff}%</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FunnelChartCard;
