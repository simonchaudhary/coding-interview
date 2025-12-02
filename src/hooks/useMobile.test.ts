import { act, renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, afterEach, expect } from "vitest";

import { useIsMobile } from "@/hooks/useMobile";

const MOBILE_BREAKPOINT = 768;

const setupViewport = (initialWidth: number) => {
  let width = initialWidth;
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });

  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const addEventListener = vi.fn(
    (_event: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    }
  );
  const removeEventListener = vi.fn(
    (_event: string, cb: (e: MediaQueryListEvent) => void) => {
      const index = listeners.indexOf(cb);
      if (index >= 0) listeners.splice(index, 1);
    }
  );

  const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
    media: query,
    matches: width < MOBILE_BREAKPOINT,
    addEventListener,
    removeEventListener,
    onchange: null,
    dispatchEvent: vi.fn(),
  }));

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: matchMediaMock,
  });

  const setWidth = (next: number) => {
    width = next;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: width,
    });
  };

  const emitChange = () => {
    const event = {
      matches: width < MOBILE_BREAKPOINT,
      media: `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    } as MediaQueryListEvent;
    listeners.forEach((cb) => cb(event));
  };

  return {
    setWidth,
    emitChange,
    addEventListener,
    removeEventListener,
    listeners,
  };
};

describe("useIsMobile", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true when initial width is below the mobile breakpoint", async () => {
    setupViewport(500);
    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("updates when viewport changes across the breakpoint", async () => {
    const { setWidth, emitChange } = setupViewport(1024);
    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    act(() => {
      setWidth(600);
      emitChange();
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("cleans up the media query listener on unmount", async () => {
    const { removeEventListener, listeners } = setupViewport(700);
    const { unmount } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(listeners.length).toBe(1);
    });
    const registeredListener = listeners[0];

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      registeredListener
    );
  });
});
