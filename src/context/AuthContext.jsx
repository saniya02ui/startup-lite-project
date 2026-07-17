import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Check token and fetch profile on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('crm-token');
      if (storedToken) {
        try {
          const res = await authService.getProfile();
          const userData = res.data?.user || res.user;
          setUser(userData);
        } catch (error) {
          console.error("Session restore failed", error);
          localStorage.removeItem('crm-token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    console.log("--- Executing AuthContext login ---");
    const res = await authService.login(email, password);
    console.log("authService.login returned:", res);
    
    const token = res.data?.token || res.token;
    const userData = res.data?.user || res.user;
    
    console.log("Extracted token:", token);
    console.log("Extracted user:", userData);

    if (token) {
      localStorage.setItem('crm-token', token);
      setToken(token);
      setUser(userData);
      console.log("State updated in AuthContext");
    } else {
      throw new Error("Invalid response from server: Token missing");
    }
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    const token = res.data?.token || res.token;
    const userData = res.data?.user || res.user;

    if (token) {
      localStorage.setItem('crm-token', token);
      setToken(token);
      setUser(userData);
    } else {
      throw new Error("Invalid response from server: Token missing");
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    window.location.href = '/login'; // Redirect via window location to force re-render/clear state
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
