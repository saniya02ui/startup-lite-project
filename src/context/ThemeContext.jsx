import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Theme Context
export const ThemeContext = createContext(undefined);

/**
 * ThemeProvider component manages the theme state (light/dark mode) of the application.
 * It applies the 'dark' class to document.documentElement when dark mode is enabled
 * and persists the preference in localStorage.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 */
export const ThemeProvider = ({ children }) => {
  // Use state initialized from localStorage, default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('startup-crm-theme');
      return savedTheme === 'true';
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return false;
    }
  });

  // Apply the correct theme class on document element when the component mounts or updates
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Failed to update class list on mount:', error);
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme state between light and dark mode.
   * Flips isDarkMode boolean, adds/removes 'dark' class, and saves to localStorage.
   */
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      try {
        const root = window.document.documentElement;
        if (newMode) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('startup-crm-theme', String(newMode));
      } catch (error) {
        console.error('Failed to save preference or update class list in toggleTheme:', error);
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom React hook to consume ThemeContext.
 * Throws a descriptive runtime error if context is accessed outside of ThemeProvider.
 *
 * @returns {{
 *   isDarkMode: boolean,
 *   toggleTheme: () => void
 * }} Theme context values.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Ensure your component tree is wrapped.');
  }
  return context;
};
