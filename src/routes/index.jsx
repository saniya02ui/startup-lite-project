import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load the page components for better performance (code splitting)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback component to display while lazy-loaded components are being fetched
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <p className="text-gray-500">Loading...</p>
  </div>
);

// AppRoutes component defines all the routing logic for the application
const AppRoutes = () => {
  return (
    // Suspense wraps the routes to handle the loading state of lazy-loaded components
    <Suspense fallback={<PageLoader />}>
      {/* Routes container for defining individual Route paths */}
      <Routes>
        {/* Dashboard route - root path */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Lead Management route */}
        <Route path="/leads" element={<Leads />} />
        
        {/* Analytics route */}
        <Route path="/analytics" element={<Analytics />} />
        
        {/* Catch-all route for undefined paths (404 Not Found) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
