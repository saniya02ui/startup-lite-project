import React from "react";
import { Users, TrendingUp, UserPlus, DollarSign } from "lucide-react";

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
  // Sample data to be replaced with real data in Phase 8
  const sampleLeads = [
    { id: 1, name: "Alice Freeman", company: "TechCorp", status: "New", dateAdded: "Oct 24, 2026" },
    { id: 2, name: "Bob Smith", company: "Innovate Inc", status: "Contacted", dateAdded: "Oct 23, 2026" },
    { id: 3, name: "Charlie Davis", company: "CloudNet", status: "Qualified", dateAdded: "Oct 22, 2026" },
    { id: 4, name: "Diana Prince", company: "Amazonia", status: "Lost", dateAdded: "Oct 20, 2026" },
    { id: 5, name: "Evan Wright", company: "Wright Systems", status: "New", dateAdded: "Oct 19, 2026" },
    { id: 6, name: "Fiona Gallagher", company: "Shamrock LLC", status: "Qualified", dateAdded: "Oct 18, 2026" },
  ];

  return (
    <div className="p-4 md:p-6 bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the Startup CRM Lite Dashboard.</p>
      </div>

      {/* Stats Cards Row (Responsive: 1 col mobile, 2 tablet, 4 desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Leads"
          value="1,248"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          change={12.5}
          color="text-blue-600"
        />
        <StatsCard
          title="Qualified"
          value="384"
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
          change={8.2}
          color="text-green-500"
        />
        <StatsCard
          title="New This Month"
          value="142"
          icon={<UserPlus className="w-5 h-5 text-yellow-500" />}
          change={-2.4}
          color="text-yellow-500"
        />
        <StatsCard
          title="Estimated Value"
          value="$84k"
          icon={<DollarSign className="w-5 h-5 text-purple-600" />}
          change={15.3}
          color="text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pipeline Overview takes 2 columns on large screens */}
        <div className="lg:col-span-2 flex flex-col">
          <PipelineOverview leads={sampleLeads} />
        </div>
        {/* Quick Actions takes 1 column */}
        <div className="flex flex-col">
          <QuickActions />
        </div>
      </div>

      {/* Recent Leads Table spans full width */}
      <div className="grid grid-cols-1">
        <RecentLeads leads={sampleLeads} />
      </div>
    </div>
  );
};

export default Dashboard;
