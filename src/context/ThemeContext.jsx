import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

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
  // Use custom useLocalStorage hook to manage dark mode theme settings automatically
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  // Dynamically toggle the 'dark' CSS class on document element root whenever theme changes
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (error) {
      console.error('Failed to update class list.', error);
    }
  }, [isDarkMode]);

  /**
   * Toggles the current theme state between light and dark mode.
   */
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
