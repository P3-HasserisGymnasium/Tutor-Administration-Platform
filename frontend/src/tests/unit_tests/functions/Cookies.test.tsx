import { cleanup } from "@testing-library/react";
import { vi } from "vitest";
import { setCookie, getCookie, deleteCookie } from "../../../utilities/helperFunctions";

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
  document.cookie = "";
});
describe("Cookie functions", () => {
  it("should set a cookie", () => {
    setCookie("test", "value", 1);
    expect(document.cookie).toContain("test=value");
  });

  it("should get a cookie", () => {
    document.cookie = "test=value";
    const cookie = getCookie("test");
    expect(cookie).toBe("value");
  });

  it("should delete a cookie", () => {
    document.cookie = "test=value";
    deleteCookie("test");
    expect(document.cookie).not.toContain("test=value");
  });

  it("should set another cookie", () => {
    setCookie("anotherTest", "anotherValue", 1);
    expect(document.cookie).toContain("anotherTest=anotherValue");
  });

  it("should get another cookie", () => {
    document.cookie = "anotherTest=anotherValue";
    const cookie = getCookie("anotherTest");
    expect(cookie).toBe("anotherValue");
  });

  it("should delete another cookie", () => {
    document.cookie = "anotherTest=anotherValue";
    deleteCookie("anotherTest");
    expect(document.cookie).not.toContain("anotherTest=anotherValue");
  });
});
