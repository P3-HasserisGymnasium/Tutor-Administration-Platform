import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { Role, TutorApplicationType } from "~/types/data_types";
import { useRolePrefix } from "~/utilities/helperFunctions";

export const useTutorApplicationService = () => {
	const useCreateTutorApplication = () => {

		const role = useRolePrefix();
		const aRole = role === "/tutee" ? Role.Enum.Tutee : Role.Enum.Tutor;



		return useMutation({
			mutationKey: ["createTutorApplication"],
			mutationFn: async (application: TutorApplicationType) => {
				const { data } = await apiClient.post(`/api/tutor-application/${aRole}`, application);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
			onSuccess: () => {
				toast.info("When an administrator accepts your application, you will be able to use the system as a tutor.");
			},
		});
	};

	const useAcceptTutorApplication = () => {
		return useMutation({
			mutationKey: ["acceptTutorApplication"],
			mutationFn: async (id: number) => {
				const { data } = await apiClient.post<number>("/api/tutor-application", id);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
			onSuccess: () => {
				toast.success("Application accepted");
			},
		});
	};

	const useRejectTutorApplication = () => {
		return useMutation({
			mutationKey: ["rejectTutorApplication"],
			mutationFn: async (id: number) => {
				const { data } = await apiClient.post<number>("/api/tutor-application", id);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
			onSuccess: () => {
				toast.success("Application rejected");
			},
		});
	};

	const useRemoveTutorApplication = () => {
		return useMutation({
			mutationKey: ["removeTutorApplication"],
			mutationFn: async (id: number) => {
				const { data } = await apiClient.post<number>("/api/tutor-application", id);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
			onSuccess: () => {
				toast.success("Application removed");
			},
		});
	};

	const useTutorApplications = () => {
		return useQuery({
			queryKey: ["getTutorApplications"],
			queryFn: async () => {
				const { data } = await apiClient.get<TutorApplicationType[]>(`/api/tutor-application`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};

	const useTutorApplication = (id: string) => {
		return useQuery({
			queryKey: ["getTutorApplication", id],
			queryFn: async () => {
				const { data } = await apiClient.get<TutorApplicationType>(`/api/tutor-application/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: {
				subjects: [],
				time_availability: [],
				tutor_profile_description: "",
				user_id: 0,
			},
		});
	};

	return {
		useCreateTutorApplication,
		useAcceptTutorApplication,
		useRejectTutorApplication,
		useRemoveTutorApplication,
		useTutorApplications,
		useTutorApplication,
	};
};
