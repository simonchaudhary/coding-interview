import { useEffect, useRef } from "react";

/**
 * Custom hook for debouncing a callback function
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds (default: 300ms)
 * @returns A debounced version of the callback
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef<T>(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };

  return debouncedCallback;
}