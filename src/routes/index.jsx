import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Lazy load the page components for better performance (code splitting)
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

// Loading fallback component to display while lazy-loaded components are being fetched
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
);

const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();
  const localToken = localStorage.getItem('crm-token');
  
  console.log('--- ProtectedRoute Check ---');
  console.log('isLoading:', isLoading);
  console.log('Context Token:', token);
  console.log('Local Token:', localToken);
  console.log('Pathname:', window.location.pathname);
  
  if (isLoading) {
    console.log('-> Returning PageLoader');
    return <PageLoader />;
  }
  
  if (!token && !localToken) {
    console.log('-> Redirecting to /login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('-> Rendering Outlet');
  return <Outlet />;
};

// AppRoutes component defines all the routing logic for the application
const AppRoutes = () => {
  return (
    // Suspense wraps the routes to handle the loading state of lazy-loaded components
    <Suspense fallback={<PageLoader />}>
      {/* Routes container for defining individual Route paths */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard route - root path */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Lead Management route */}
          <Route path="/leads" element={<Leads />} />
          
          {/* Analytics route */}
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        
        {/* Catch-all route for undefined paths (404 Not Found) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
