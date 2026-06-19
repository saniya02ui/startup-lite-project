import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AppRoutes from './routes';

// Main App component
function App() {
  return (
    // Router component wraps the entire application to enable routing capabilities
    <Router>
      {/* Main layout container with flex to align sidebar and content horizontally */}
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-sans transition-colors duration-200">
        
        {/* Render the Sidebar component */}
        <Sidebar />
        
        {/* Main content area */}
        <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          {/* Render the top Navbar */}
          <Navbar />
          
          {/* Main page content routes container */}
          <div className="flex-1">
            <AppRoutes />
          </div>
        </main>
        
      </div>
      {/* Toaster for global notifications */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
