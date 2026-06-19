import React from 'react';
import { NavLink } from 'react-router-dom';
import DarkModeToggle from './common/DarkModeToggle';
import { Home, Users, BarChart2 } from 'lucide-react';

// Sidebar component for application navigation
const Sidebar = () => {

  // Navigation links array to easily manage sidebar items
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Lead Management', path: '/leads', icon: <Users className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="w-5 h-5" /> },
  ];

  return (
    // Sidebar container styling: hidden on mobile, narrow on md, wide on lg
    <aside className="hidden md:flex flex-col justify-between bg-gray-900 text-white min-h-screen transition-all duration-300 w-20 lg:w-64 border-r border-gray-800">
      <div>
        {/* Sidebar Header */}
        <div className="p-4 lg:p-6 flex items-center justify-center lg:justify-start">
          <h2 className="hidden lg:block text-2xl font-bold">Startup CRM</h2>
          <div className="lg:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">S</div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            // NavLink automatically applies 'active' class/style based on current URL
            <NavLink
              key={item.name}
              to={item.path}
              // Dynamic styling based on isActive state provided by NavLink
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start px-4 py-3 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-blue-600 text-white' // Active state styling
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white' // Inactive state styling
                }`
              }
              title={item.name}
            >
              <div className="flex items-center justify-center min-h-[24px] min-w-[24px]">
                {item.icon}
              </div>
              <span className="hidden lg:block ml-3 font-medium whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Theme Toggler */}
      <div className="p-4 border-t border-gray-800 flex justify-center">
        <DarkModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
