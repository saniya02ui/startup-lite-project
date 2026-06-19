import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';

/**
 * ActivityHeatmap Component.
 * Displays a contribution board of daily CRM activities over the last year.
 * Activities tracked: Creation, Contact, Meetings Scheduled, Proposals Sent, Deals Won.
 *
 * @param {Object} props - React props.
 * @param {Array} props.data - Daily activity counts dataset.
 */
export const ActivityHeatmap = ({ data = [] }) => {
  // Convert list to lookup table
  const activityLookup = useMemo(() => {
    const lookup = {};
    data.forEach(item => {
      if (item && item.date) {
        lookup[item.date] = item;
      }
    });
    return lookup;
  }, [data]);

  // Generate date list for the last 365 days, aligned to start on Sunday
  const daysToRender = useMemo(() => {
    const list = [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // We go back 52 weeks (364 days)
    const totalDays = 364;
    const startDate = new Date(today.getTime() - (totalDays * 24 * 60 * 60 * 1000));
    
    // Aligns starting index with Sunday
    const startDay = startDate.getDay();
    const alignedStart = new Date(startDate.getTime() - (startDay * 24 * 60 * 60 * 1000));
    
    let current = new Date(alignedStart.getTime());
    // End calendar on the next Saturday to complete the grid nicely
    const endDayOffset = 6 - today.getDay();
    const alignedEnd = new Date(today.getTime() + (endDayOffset * 24 * 60 * 60 * 1000));

    while (current <= alignedEnd) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      const dateKey = `${yyyy}-${mm}-${dd}`;

      list.push({
        date: dateKey,
        dayOfWeek: current.getDay(),
        month: current.getMonth(),
        monthLabel: current.toLocaleString('default', { month: 'short' }),
        dateObj: new Date(current.getTime()),
        label: current.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }),
        activity: activityLookup[dateKey] || { count: 0, created: 0, contacted: 0, meeting: 0, proposal: 0, won: 0 }
      });
      
      current.setDate(current.getDate() + 1);
    }
    return list;
  }, [activityLookup]);

  // Group days into columns of weeks (7 days each)
  const weeks = useMemo(() => {
    const cols = [];
    let currentWeek = [];
    
    daysToRender.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === daysToRender.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return cols;
  }, [daysToRender]);

  // Find where months start to render column labels at the top
  const monthLabels = useMemo(() => {
    const labels = [];
    let prevMonth = -1;

    weeks.forEach((week, wIdx) => {
      // Look at the first day of the week to check month
      const firstDay = week[0];
      if (firstDay && firstDay.month !== prevMonth) {
        labels.push({
          label: firstDay.monthLabel,
          colIndex: wIdx
        });
        prevMonth = firstDay.month;
      }
    });

    return labels;
  }, [weeks]);

  // Calculate total actions in the current heatmap window
  const totalActions = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.count || 0), 0);
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[300px] justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-red-500 fill-red-500/20" />
            Activity Heatmap
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Timeline representation of customer updates and sales logs
          </p>
        </div>
        <span className="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl font-bold text-slate-600 dark:text-slate-400">
          {totalActions} actions logged
        </span>
      </div>

      {/* Grid container with horizontal scroll */}
      <div className="flex-1 flex flex-col justify-center min-h-0 select-none">
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin flex flex-col">
          {/* Months Row */}
          <div className="flex relative h-5 text-[10px] font-bold text-slate-450 dark:text-slate-500 pl-8 mb-1">
            {monthLabels.map((lbl, idx) => (
              <span 
                key={idx}
                className="absolute"
                style={{ left: `${lbl.colIndex * 19 + 32}px` }}
              >
                {lbl.label}
              </span>
            ))}
          </div>

          {/* Grid Rows + Weekday Labels */}
          <div className="flex">
            {/* Weekdays indicator column */}
            <div className="flex flex-col gap-[5px] text-[9px] font-bold text-slate-500 dark:text-slate-500 w-8 pr-2 shrink-0 pt-[2px]">
              <span>Sun</span>
              <span className="invisible">Mon</span>
              <span>Tue</span>
              <span className="invisible">Wed</span>
              <span>Thu</span>
              <span className="invisible">Fri</span>
              <span>Sat</span>
            </div>

            {/* Heatmap Grid */}
            <div className="flex gap-[5px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[5px] shrink-0">
                  {week.map((day) => {
                    let colorClass = 'bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600';
                    if (day.activity.count > 0) {
                      if (day.activity.count <= 2) {
                        colorClass = 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 hover:opacity-80';
                      } else if (day.activity.count <= 4) {
                        colorClass = 'bg-blue-300 dark:bg-blue-800 text-white hover:opacity-80';
                      } else if (day.activity.count <= 6) {
                        colorClass = 'bg-blue-500 text-white hover:opacity-80';
                      } else {
                        colorClass = 'bg-blue-700 dark:bg-blue-400 text-white hover:opacity-80';
                      }
                    }

                    return (
                      <div
                        key={day.date}
                        className={`w-[14px] h-[14px] rounded-[3px] transition-all duration-200 relative group cursor-pointer ${colorClass}`}
                      >
                        {/* Tooltip Popup */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-100 p-3 rounded-2xl shadow-xl text-[10px] w-44 hidden group-hover:block z-30 pointer-events-none border border-slate-700 font-semibold space-y-1">
                          <p className="border-b border-slate-800 pb-1 mb-1 text-slate-350">{day.label}</p>
                          <p className="text-blue-400 text-xs font-bold">{day.activity.count} Actions Logged</p>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-400 font-medium border-t border-slate-800/50 pt-1">
                            <span>Created: {day.activity.created}</span>
                            <span>Contacted: {day.activity.contacted}</span>
                            <span>Meeting: {day.activity.meeting}</span>
                            <span>Proposal: {day.activity.proposal}</span>
                            <span>Won: {day.activity.won}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex justify-end items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 pt-2 border-t border-gray-200 dark:border-gray-700/70">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-700/50" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-100 dark:bg-blue-900/30" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-300 dark:bg-blue-800" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-500" />
        <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-700 dark:bg-blue-400" />
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
