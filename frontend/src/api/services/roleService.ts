import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { tutorListFilterType } from '~/types/data_types';
import { ProfileType } from "~/types/entity_types";

// tutee/tutor:role_id -> role:student_id -> student:id



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

	// tutor information gets returned
	const getTutors = useMutation({
		mutationKey: ["getTutors"],
		mutationFn: async (filters: tutorListFilterType) => {
			const { data } = await apiClient.post<ProfileType[]>(
				`/api/role_service`, filters
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			//
		},
	});

	const getTutorProfile = useMutation({
			mutationKey: ["getProfile"],
			mutationFn: async (id:string|null) => {
				const { data } = await apiClient.get<ProfileType>(
					`/api/role/tutor/${id}`,
				);
				return data;
			},
	}); 

	const editProfile = useMutation({
		mutationKey: ["editProfile"],
		mutationFn: async (profile: ProfileType) => {
			const { data } = await apiClient.post<ProfileType>(
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
		getTutorProfile,
		editProfile
	};
};
