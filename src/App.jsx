import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';

// Main App component
function App() {
  return (
    // Router component wraps the entire application to enable routing capabilities
    <Router>
      {/* Main layout container with flex to align sidebar and content horizontally */}
      <div className="flex min-h-screen bg-gray-100 font-sans">
        
        {/* Render the Sidebar component */}
        <Sidebar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {/* Render the application routes */}
          <AppRoutes />
        </main>
        
      </div>
      {/* Toaster for global notifications */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
