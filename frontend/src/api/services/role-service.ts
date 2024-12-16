import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { tutorListFilterType, YearGroup } from "~/types/data_types";
import { TuteeProfileType, TutorProfileType } from "~/types/entity_types";

// tutee/tutor:role_id -> role:student_id -> student:id

export const useRoleService = () => {
	const assignTuteeRole = useMutation({
		mutationKey: ["assignTuteeRole"],
		mutationFn: async (studentId: number) => {
			const { data } = await apiClient.post<number>("/api/role", studentId);
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
			const { data } = await apiClient.post<number>("/api/role", roleId);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Tutee assigned");
		},
	});

	const useGetTutees = () => {
		return useQuery({
			queryKey: ["getTutees"],
			queryFn: async () => {
				// crunch code 1 week left dont look, it work.
				const { data } = await apiClient.get(`/api/role/tutees`);
				const cleanedString = data.replace(/^(\[.*\])(\[.*\])$/, "$1");
				const parsedData = JSON.parse(cleanedString);
				console.log("parsed", parsedData);
				console.log("original", data);
				console.log("cleaned", cleanedString);
				return parsedData;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};
	// tutor information gets returned
	const useGetTutors = (filters: tutorListFilterType) => {
		return useQuery({
			queryKey: ["getTutors", filters],
			queryFn: async () => {
				const { data } = await apiClient.post<TutorProfileType[]>(`/api/role/tutorsFiltered`, filters);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};

	const useGetTutorProfile = (id: number | null) => {
		return useQuery({
			queryKey: ["getProfile", id],
			queryFn: async () => {
				const { data } = await apiClient.get<TutorProfileType>(`/api/role/${id}/Tutor`);
				return data;
			},
			refetchOnWindowFocus: false,
			enabled: id !== null,
			placeholderData: {
				id: 0,
				contact_info: [],
				description: "",
				full_name: "",
				year_group: YearGroup.Enum.IB_1,
				languages: [],
				tutoring_subjects: [],
				time_availability: [],
			},
		});
	};
	const useGetTuteeProfile = (id: number | null) => {
		return useQuery({
			queryKey: ["getProfile", id],
			queryFn: async () => {
				const { data } = await apiClient.get<TuteeProfileType>(`/api/role/${id}/Tutee`);
				return data;
			},
			refetchOnWindowFocus: false,
			enabled: id !== null,
			placeholderData: {
				id: 0,
				full_name: "",
				year_group: YearGroup.Enum.IB_1,
				languages: [],
				subjects_receiving_help_in: [],
				contact_info: [],
			},
		});
	};

	const useEditProfile = () => {
		return useMutation({
			mutationKey: ["editProfile"],
			mutationFn: async (profile: TutorProfileType) => {
				const { data } = await apiClient.post<TutorProfileType>("/api/role", profile);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Profile saved");
			},
		});
	};

	return {
		assignTuteeRole,
		removeRole,
		useGetTutors,
		useGetTutees,
		useGetTutorProfile,
		useGetTuteeProfile,
		useEditProfile,
	};
};
