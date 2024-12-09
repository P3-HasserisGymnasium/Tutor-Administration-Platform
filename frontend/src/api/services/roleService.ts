import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { LanguageType, SubjectType, TimeAvailabilityType, tutorListFilterType, YearGroupType } from '~/types/data_types';
import { ProfileType } from "~/types/entity_types";

// tutee/tutor:role_id -> role:student_id -> student:id

type tutorProfileType = {
	contact_info: string | null,	
	description: string | null,
	full_name: string | null,
	time_availability: TimeAvailabilityType[],
	tutoring_subjects: SubjectType[]
	yearGroup: YearGroupType
	languages: LanguageType[]
}

export const useRoleService =()=> {

	const assignTuteeRole = useMutation({
		mutationKey: ["assignTuteeRole"],
		mutationFn: async (studentId: number) => {
			const { data } = await apiClient.post<number>(
				"/api/role",
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
				"/api/role",
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
				`/api/role`
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
				`/api/role`, filters
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

	const useGetTutorProfile = (id: number) => { return useQuery({
			queryKey: ["getProfile", id],
			queryFn: async () => {
				const { data } = await apiClient.get<tutorProfileType>(
					`/api/role/${id}/Tutor`,
				);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: {
				contact_info: null,
				description: null,
				full_name: null,
				time_availability: [],
				tutoring_subjects: [],
				yearGroup: "PRE_IB",
				languages: []
			},
	})};

	const editProfile = useMutation({
		mutationKey: ["editProfile"],
		mutationFn: async (profile: ProfileType) => {
			const { data } = await apiClient.post<ProfileType>(
				"/api/role",
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
		useGetTutorProfile,
		editProfile
	};
};
