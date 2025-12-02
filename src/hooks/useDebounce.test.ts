import { act, renderHook } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("calls the callback after the specified delay with provided arguments", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 200));

    act(() => {
      result.current("hello", 123);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("hello", 123);
  });

  it("debounces successive calls and uses the latest callback reference", () => {
    const firstCallback = vi.fn();
    const latestCallback = vi.fn();

    const { result, rerender } = renderHook(({ cb }) => useDebounce(cb, 100), {
      initialProps: { cb: firstCallback },
    });

    act(() => {
      result.current("first");
    });

    act(() => {
      rerender({ cb: latestCallback });
      result.current("second");
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(latestCallback).toHaveBeenCalledTimes(1);
    expect(latestCallback).toHaveBeenCalledWith("second");
  });

  it("clears pending timeouts on unmount to avoid late calls", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 150));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(100);
      unmount();
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
