import React from "react";
import { Users, TrendingUp, UserPlus, DollarSign } from "lucide-react";
import { useLeads } from "../context/LeadContext";

// Dashboard Components
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";

/**
 * Dashboard page component.
 * Assembles various dashboard widgets and provides a high-level overview.
 */
const Dashboard = () => {
  // Consume global leads array from context
  const { leads } = useLeads();

  // Calculate dynamic dashboard stats
  const totalLeadsCount = leads.length;
  const wonLeadsCount = leads.filter((lead) => lead.status === "Won").length;
  
  // Calculate new leads added in the current calendar month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newLeadsThisMonthCount = leads.filter((lead) => {
    if (!lead.createdAt) return false;
    const date = new Date(lead.createdAt);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  // Calculate estimated financial value of the pipeline stages
  const calculatePipelineValue = () => {
    const valueMap = {
      'New': 1000,
      'Contacted': 2000,
      'Meeting Scheduled': 5000,
      'Proposal Sent': 10000,
      'Won': 15000,
      'Lost': 0,
    };
    const total = leads.reduce((sum, lead) => sum + (valueMap[lead.status] || 0), 0);
    if (total >= 1000) {
      return `$${(total / 1000).toFixed(1)}k`;
    }
    return `$${total}`;
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome to the Startup CRM Lite Dashboard.</p>
      </div>

      {/* Stats Cards Row (Responsive: 1 col mobile, 2 tablet, 4 desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Leads"
          value={totalLeadsCount.toLocaleString()}
          icon={<Users className="w-5 h-5 text-blue-600" />}
          change={12.5}
          color="text-blue-600"
        />
        <StatsCard
          title="Deals Won"
          value={wonLeadsCount.toLocaleString()}
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          change={8.2}
          color="text-green-500"
        />
        <StatsCard
          title="New This Month"
          value={newLeadsThisMonthCount.toLocaleString()}
          icon={<UserPlus className="w-5 h-5 text-yellow-500" />}
          change={-2.4}
          color="text-yellow-500"
        />
        <StatsCard
          title="Estimated Value"
          value={calculatePipelineValue()}
          icon={<DollarSign className="w-5 h-5 text-purple-600" />}
          change={15.3}
          color="text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Overview takes 2 columns on large screens */}
        <div className="lg:col-span-2 flex flex-col">
          <PipelineOverview leads={leads} />
        </div>
        {/* Quick Actions takes 1 column */}
        <div className="flex flex-col">
          <QuickActions />
        </div>
      </div>

      {/* Recent Leads Table spans full width */}
      <div className="grid grid-cols-1">
        <RecentLeads leads={leads} />
      </div>
    </div>
  );
};

export default Dashboard;
