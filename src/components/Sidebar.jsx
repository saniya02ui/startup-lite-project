import React from 'react';
import { NavLink } from 'react-router-dom';

// Sidebar component for application navigation
const Sidebar = () => {
  // Navigation links array to easily manage sidebar items
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Lead Management', path: '/leads' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    // Sidebar container styling
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6">
        <h2 className="text-2xl font-bold">Startup CRM</h2>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          // NavLink automatically applies 'active' class/style based on current URL
          <NavLink
            key={item.name}
            to={item.path}
            // Dynamic styling based on isActive state provided by NavLink
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white' // Active state styling
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white' // Inactive state styling
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
