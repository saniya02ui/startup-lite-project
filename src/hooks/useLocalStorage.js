import { useState, useCallback } from 'react';

/**
 * A custom React hook that manages state synchronized with localStorage.
 * It provides the same functional signature as `useState` but serializes
 * state mutations directly to client storage. Handles unavailable storage
 * configurations and parse/stringify errors gracefully.
 *
 * @template T
 * @param {string} key - The key under which the data is stored in localStorage.
 * @param {T | (() => T)} initialValue - The initial fallback value or a function returning it.
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} An array containing the current state value and its setter.
 */
export function useLocalStorage(key, initialValue) {
  // Use state initializer function to avoid reading from localStorage on every render
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      // Return parsed JSON if found, otherwise return the provided initial value
      if (item !== null) {
        return JSON.parse(item);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  /**
   * Sets the state and updates the value stored in localStorage.
   * Leverages functional update logic matching React's standard `useState` behavior.
   *
   * @param {T | ((prev: T) => T)} value - The new state value or updater function.
   */
  const setValue = useCallback((value) => {
    try {
      setStoredValue((currentVal) => {
        // Evaluate the updater if a callback function is provided
        const valueToStore = value instanceof Function ? value(currentVal) : value;
        
        try {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
        } catch (storageError) {
          console.warn(`Failed to set localStorage key "${key}" (storage may be disabled/blocked):`, storageError);
        }

        return valueToStore;
      });
    } catch (stateError) {
      console.error(`Failed to update state for key "${key}":`, stateError);
    }
  }, [key]);

  return [storedValue, setValue];
}
