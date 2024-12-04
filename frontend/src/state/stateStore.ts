import { atom } from "jotai";
import { Role } from "~/types/data_types";
import { UserState } from "~/types/entity_types";

export const userAtom = atom<UserState>({
	id: null,
	name: null,
	role: [Role.enum.Tutee, Role.Enum.Tutor],
	email: null,
	year_group: null,
	tutoring_subjects: null,
});

export const isAuthenticatedAtom = atom(true);
