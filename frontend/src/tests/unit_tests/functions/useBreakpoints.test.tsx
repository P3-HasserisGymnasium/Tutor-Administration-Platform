import { renderHook } from "@testing-library/react";
import { useBreakpoints } from "~/utilities/helperFunctions";
import mediaQuery from "css-mediaquery";

function createMatchMedia(width: unknown) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

describe("useBreakpoints", () => {
  it("should return isMobile as true for small 400px width screen", () => {
    window.matchMedia = createMatchMedia(400);
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.isMobile).toBe(true);
  });

  it("should return isMobile as false for 1200px width screen", () => {
    window.matchMedia = createMatchMedia(1200);
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.isMobile).toBe(false);
  });

  it("should return isLaptop as true for large screen widths", () => {
    window.matchMedia = createMatchMedia(2400);
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.isLaptop).toBe(true);
  });

  it("should return isLaptop as false for small screen widths", () => {
    window.matchMedia = createMatchMedia(400);
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.isLaptop).toBe(false);
  });

  it("should return hasScrollbar as true when the screen has a scrollbar", () => {
    Object.defineProperty(window, "innerHeight", { value: 300, configurable: true });
    Object.defineProperty(document.documentElement, "clientHeight", { value: 200, configurable: true });
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.hasScrollbar).toBe(true);
  });

  it("should return hasScrollbar as false when the screen does not have a scrollbar", () => {
    Object.defineProperty(window, "innerHeight", { value: 200, configurable: true });
    Object.defineProperty(document.documentElement, "clientHeight", { value: 300, configurable: true });
    const { result } = renderHook(() => useBreakpoints());
    expect(result.current.hasScrollbar).toBe(false);
  });
});
