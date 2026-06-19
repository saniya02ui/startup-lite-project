import React from 'react';
import { Trophy, Award, Medal, Users } from 'lucide-react';

/**
 * Formats values in Indian Rupees.
 */
const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Renders rank icon/badge.
 */
const RankBadge = ({ rank }) => {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500 shrink-0 shadow-sm border border-amber-100 dark:border-amber-900/50">
        <Trophy className="w-4 h-4 fill-amber-500/10" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 shrink-0 shadow-sm border border-slate-200 dark:border-slate-600">
        <Medal className="w-4 h-4" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 shrink-0 shadow-sm border border-orange-105 dark:border-orange-900/50">
        <Award className="w-4 h-4" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800/80 flex items-center justify-center text-slate-450 dark:text-slate-400 text-xs font-bold shrink-0 border border-gray-100 dark:border-gray-700">
      {rank}
    </div>
  );
};

/**
 * TopPerformersCard Component.
 * Leaderboard ranking sales reps based on total closed won deal revenue.
 *
 * @param {Object} props - React props.
 * @param {Array} props.performers - Ranked list of rep data.
 */
export const TopPerformersCard = ({ performers = [] }) => {
  const topRevenueValue = performers[0]?.value || 1; // Prevent divide by zero

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-150 dark:border-gray-700 flex flex-col h-[300px]">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Top Performers</h3>
          <p className="text-xs text-slate-405 dark:text-slate-500 mt-0.5">Sales reps ranked by closed-won revenue contribution</p>
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin">
        {performers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs space-y-2">
            <Users className="w-8 h-8 opacity-40" />
            <p className="font-semibold">No closed-won deals recorded yet</p>
          </div>
        ) : (
          performers.map((rep, idx) => {
            const rank = idx + 1;
            const percentage = Math.round((rep.value / topRevenueValue) * 100);

            return (
              <div 
                key={rep.owner}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-all duration-150"
              >
                {/* Rank Badge */}
                <RankBadge rank={rank} />

                {/* Profile Detail */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                      {rep.owner}
                    </span>
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                        {formatINR(rep.value)}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {rep.leadsCount} deals won
                      </span>
                    </div>
                  </div>

                  {/* Relative bar chart representation */}
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        rank === 1 
                          ? 'bg-amber-500' 
                          : rank === 2 
                            ? 'bg-slate-400' 
                            : rank === 3 
                              ? 'bg-orange-500' 
                              : 'bg-blue-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopPerformersCard;
