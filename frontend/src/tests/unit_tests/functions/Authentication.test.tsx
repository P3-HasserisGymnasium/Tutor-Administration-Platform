import { act, renderHook } from "@testing-library/react";
import { AuthProvider } from "~/api/authentication/AuthProvider";
import { useAuth } from "~/api/authentication/useAuth";
import { Role } from "~/types/data_types";
import { getCookie, setCookie } from "~/utilities/helperFunctions";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};

describe("Account Service", () => {
	it("should login and set cookies", async () => {
		const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper });

		act(() => {
			const userState = {
				id: 1,
				name: "Andreas",
				role: [Role.Enum.Tutee],
				email: "andreas@gmail.dk",
				year_group: null,
				tutoring_subjects: [],
				is_administrator: false,
			};

			result.current.login(userState, "kaskelothval");

			const userStateCookie = decodeURIComponent(getCookie("user") || "");
			const isAuthenticatedCookie = decodeURIComponent(getCookie("isAuthenticated") || "");
			const tokenCookie = decodeURIComponent(getCookie("Bearer") || "");
			expect(userStateCookie).toContain(JSON.stringify(userState));
			expect(tokenCookie).toContain("kaskelothval");
			expect(isAuthenticatedCookie).toContain("true");
		});
	});

	it("should logout and delete cookies", async () => {
		const { result } = renderHook(() => useAuth(), { wrapper: AuthWrapper });
		setCookie("user", JSON.stringify({ id: 1 }), 1);
		setCookie("Bearer", "kaskelo", 1);
		setCookie("isAuthenticated", "true", 1);

		act(() => {
			result.current.logout();

			const userStateCookie = decodeURIComponent(getCookie("user") || "");
			const isAuthenticatedCookie = decodeURIComponent(getCookie("isAuthenticated") || "");
			const tokenCookie = decodeURIComponent(getCookie("Bearer") || "");

			expect(userStateCookie).toBe("");
			expect(tokenCookie).toBe("");
			expect(isAuthenticatedCookie).toBe("");
		});
	});
});
