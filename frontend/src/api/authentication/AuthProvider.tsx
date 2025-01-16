// AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from "react";
import { AuthContext, initialUserState } from "./AuthContext";
import { UserState } from "~/types/entity_types";
import { Role, Subject } from "~/types/data_types";
import { getCookie, setCookie, deleteCookie } from "~/utilities/helperFunctions";

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [userState, setUserState] = useState<UserState>(initialUserState);
	const [isAuthenticated, setIsAuthenticated] = useState(getCookie("isAuthenticated") === "true");

	const getToken = () => getCookie("Bearer");

	const login = (userData: UserState, token: string) => {
		setIsAuthenticated(true);
		setUserState({
			id: userData.id,
			name: userData.name,
			role: userData.role?.map((role) => Role.Enum[role as keyof typeof Role.Enum]) || null,
			email: userData.email,
			year_group: userData.year_group as UserState["year_group"],
			tutoring_subjects:
				userData.tutoring_subjects?.map((subject) => Subject.Enum[subject as keyof typeof Subject.Enum]) || null,
			is_administrator: userData.is_administrator,
		});
		if (!userData) {
			return;
		}
		setCookie("Bearer", token, 1);
		setCookie("user", JSON.stringify(userData), 1); // Store only the `id`
		setCookie("isAuthenticated", JSON.stringify(true), 1);
	};

	const logout = () => {
		setUserState(initialUserState);
		setIsAuthenticated(false);
		deleteCookie("Bearer");
		deleteCookie("user");
		deleteCookie("isAuthenticated");
	};

	useEffect(() => {
		const token = getToken();
		const storedUser = getCookie("user");
		const storedIsAuthenticated = getCookie("isAuthenticated");

		if (token && storedUser && storedIsAuthenticated) {
			try {
				const parsedUser = JSON.parse(decodeURIComponent(storedUser));
				setUserState(parsedUser);
				setIsAuthenticated(true);
			} catch (error) {
				console.error("Failed to parse stored user data:", error);
				setIsAuthenticated(false);
			}
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	return <AuthContext.Provider value={{ userState, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
