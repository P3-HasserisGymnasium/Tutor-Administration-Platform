import { createContext } from "react";
import { UserState } from "~/types/entity_types";

export const initialUserState: UserState = {
	id: null,
	name: null,
	role: null,
	email: null,
	year_group: null,
	tutoring_subjects: null,
	is_administrator: null,
};

type AuthContextType = {
	userState: UserState;
	isAuthenticated: boolean;
	login: (user: UserState, token: string) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
