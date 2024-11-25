import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { Language, Subject, YearGroup } from "~/types/enums";

// tutee/tutor:role_id -> role:student_id -> student:id

type Profile = {
	full_name: string,
	year_group: YearGroup,
	languages: Language[],
	subjects: Subject[],
	description?: string
}

export const useRoleService = () => {

	const assignTuteeRole = useMutation({
		mutationKey: ["assignTuteeRole"],
		mutationFn: async (studentId: number) => {
			const { data } = await apiClient.post<number>(
				"/api/role_service",
				studentId
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Tutee assigned");
		},
	});

	const removeRole = useMutation({
		mutationKey: ["removeRole"],
		mutationFn: async (roleId: number) => {
			const { data } = await apiClient.post<number>(
				"/api/role_service",
				roleId
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Tutee assigned");
		},
	});

	// Assuming student id array gets returned
	const getTutees = useQuery({
		queryKey: ["getTutees"],
		queryFn: async () => {
			const { data } = await apiClient.get<number[]>(
				`/api/role_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	// Assuming student id array gets returned
	const getTutors = useQuery({
		queryKey: ["getTutors"],
		queryFn: async () => {
			const { data } = await apiClient.get<number[]>(
				`/api/role_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	const getProfile = useQuery({
		queryKey: ["getProfile"],
		queryFn: async () => {
			const { data } = await apiClient.get<Profile>(
				`/api/role_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
	});

	const editProfile = useMutation({
		mutationKey: ["editProfile"],
		mutationFn: async (profile: Profile) => {
			const { data } = await apiClient.post<Profile>(
				"/api/role_service",
				profile
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Profile saved");
		},
	});

	return {
		assignTuteeRole,
		removeRole,
		getTutees,
		getTutors,
		getProfile,
		editProfile
	};
};
