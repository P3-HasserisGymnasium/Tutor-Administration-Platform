import { renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useRolePrefix } from "~/utilities/helperFunctions";

const router = ({ children }: { children: React.ReactNode }) => (
	<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</BrowserRouter>
);

describe("useRolePrefix", () => {
	it("/tutee/collaborations should return /tutee", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutee/collaborations",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutee");
	});

	it("/tutor/collaborations should return /tutor", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutor/collaborations",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutor");
	});

	it("/tutee should return /tutee", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutee",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutee");
	});

	it("/tutor should return /tutor", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutor",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutor");
	});

	it("/tutee/collaborations/1 should return /tutee", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutee/collaborations/1",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutee");
	});

	it("/tutor/profile should return /tutor", () => {
		Object.defineProperty(window, "location", {
			value: {
				pathname: "/tutor/profile",
			},
			writable: true,
		});
		const { result } = renderHook(() => useRolePrefix(), { wrapper: router });
		expect(result.current).toBe("/tutor");
	});
});
