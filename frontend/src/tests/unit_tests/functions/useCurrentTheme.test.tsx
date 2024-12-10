import { renderHook } from "@testing-library/react";
import baseTheme from "~/themes/baseTheme";
import tuteeTheme from "~/themes/tuteeTheme";
import tutorTheme from "~/themes/tutorTheme";
import unauthenticatedAppTheme from "~/themes/unauthenticatedAppTheme";
import { useCurrentTheme } from "~/utilities/helperFunctions";
import { BrowserRouter as Router } from "react-router-dom";

describe("useCurrentTheme", () => {
	it("should return tutee theme for tutee path", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutee",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(tuteeTheme);
	});

	it("should return tutor theme for tutor path", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutor",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(tutorTheme);
	});

	it("should return base theme for other paths", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(baseTheme);
	});

	it("should return base theme for empty or null path", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(baseTheme);
	});

	it("should return unauthenticatedAppTheme for login path", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/login",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(unauthenticatedAppTheme);
	});

	it("should return unauthenticatedAppTheme for register path", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/register",
			},
			writable: true,
		});
		const { result } = renderHook(() => useCurrentTheme(), { wrapper: Router });
		expect(result.current).toBe(unauthenticatedAppTheme);
	});
});
