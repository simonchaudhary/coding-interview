import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for managing debounced state
 * Provides immediate local state updates while debouncing external callbacks
 *
 * Perfect for:
 * - Search inputs (debounce API calls while typing feels instant)
 * - Form auto-save (save after user stops typing)
 * - URL state sync (update URL after debounce delay)
 * - Analytics tracking (track events after user stops interacting)
 * - Live previews (render preview after typing pause)
 * - Filter inputs (apply filters after user finishes selecting)
 *
 * @param externalValue - The external state value to sync with (e.g., from useQueryStates, props, or parent state)
 * @param onDebouncedChange - Callback to invoke after debounce delay (e.g., API call, state update)
 * @param debounceDelay - Delay in milliseconds before invoking the callback (default: 300ms)
 * @returns [localValue, handleChange] - Local value for immediate UI updates and change handler
 *
 */
export function useDebounce<T>(
  externalValue: T,
  onDebouncedChange: (value: T) => void,
  debounceDelay: number = 300
): [T, (value: T) => void] {
  // Local state for immediate UI updates (responsive UX)
  const [localValue, setLocalValue] = useState<T>(externalValue);
  const debounceTimerRef = useRef<number | null>(null);

  // Sync local state with external value when it changes externally
  // (e.g., browser back/forward button, parent state change, prop update)
  useEffect(() => {
    if (externalValue !== localValue) {
      setLocalValue(externalValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue]);

  // Cleanup timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = (value: T) => {
    // Update local state immediately for responsive UX
    setLocalValue(value);

    // Clear previous timer (implement debounce cancellation)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the callback (trigger after delay)
    debounceTimerRef.current = window.setTimeout(() => {
      onDebouncedChange(value);
    }, debounceDelay);
  };

  return [localValue, handleChange];
}
