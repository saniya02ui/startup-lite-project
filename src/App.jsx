import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import AppRoutes from './routes';

// Main App component
function App() {
  return (
    // Router component wraps the entire application to enable routing capabilities
    <Router>
      {/* Outer wrapper to center the app on extra large screens */}
      <div className="min-h-screen bg-gray-200 dark:bg-black w-full flex justify-center">
        {/* Main layout container with flex-col on mobile for bottom nav, md:flex-row for sidebar */}
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-200 w-full max-w-[1440px] shadow-2xl relative">
          
          {/* Render the Sidebar component */}
          <Sidebar />
          
          {/* Main content area */}
          <main className="flex-1 flex flex-col h-screen md:min-h-screen overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200 pb-16 md:pb-0">
            {/* Render the top Navbar */}
            <Navbar />
            
            {/* Main page content routes container */}
            <div className="flex-1">
              <AppRoutes />
            </div>
          </main>
          
          {/* Render the BottomNav on mobile */}
          <BottomNav />
        </div>
      </div>
      {/* Toaster for global notifications */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
