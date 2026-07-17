import axios from 'axios';
import toast from 'react-hot-toast';

// Create an Axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Request interceptor: automatically attach Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('crm-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle global errors like 401 Unauthorized or Network failures
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("[API Interceptor] 401 Unauthorized encountered. Redirecting to /login", error.config.url);
      // Token is invalid or expired
      localStorage.removeItem('crm-token');
      window.location.href = '/login';
    } else if (!error.response) {
      // Network error (server down, CORS, etc)
      toast.error('Cannot connect to server. Check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
