import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, BarChart2 } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="w-6 h-6" /> },
    { name: 'Leads', path: '/leads', icon: <Users className="w-6 h-6" /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 className="w-6 h-6" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 transition-colors duration-200 pb-safe">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.name} className="flex-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 min-h-[44px] min-w-[44px] ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
