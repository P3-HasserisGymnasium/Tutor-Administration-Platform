import { renderHook } from "@testing-library/react";
import { useBreakpoints, useVariableWidth } from "~/utilities/helperFunctions";
import { vi } from "vitest";
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

describe("useVariableWidth", () => {
  it("should return 100% when isMobile is true", () => {
    window.matchMedia = createMatchMedia(400);
    const { result } = renderHook(() => useVariableWidth(50));
    expect(result.current).toBe("100%");
  });

  it("should return percentage string when value is a number and isMobile is false", () => {
    window.matchMedia = createMatchMedia(800);

    const { result } = renderHook(() => useVariableWidth(0.5));
    expect(result.current).toBe("50.00%");
  });

  it("should return percentage string with two decimal places when value is a number and isMobile is false", () => {
    window.matchMedia = createMatchMedia(900);

    const { result } = renderHook(() => useVariableWidth(0.1234));
    expect(result.current).toBe("12.34%");
  });

  it("should return the input if it is not a number", () => {
    window.matchMedia = createMatchMedia(900);

    vi.mock("../../hooks/useBreakpoints", () => ({
      useBreakpoints: () => ({ isMobile: true }),
    }));
    const { result } = renderHook(() => useVariableWidth("string"));
    expect(result.current).toBe("string");
  });
});
