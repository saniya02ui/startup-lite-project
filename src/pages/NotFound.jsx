import React from 'react';
import { Link } from 'react-router-dom';

// 404 Not Found page component
const NotFound = () => {
  return (
    // Flex container to center the content
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* 404 Header */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      {/* Description text */}
      <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      {/* Link to navigate back to the home page */}
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
