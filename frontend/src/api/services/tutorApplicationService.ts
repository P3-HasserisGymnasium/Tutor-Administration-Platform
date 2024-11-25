import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { Subject } from "~/types/enums";

type TutorApplication = {
	id?: number,
	subject: Subject,
	application_text: string,
	rejection_reason?: string
}

export const useTutorApplicationService = () => {

	const createTutorApplication = useMutation({
		mutationKey: ["createTutorApplication"],
		mutationFn: async (application: TutorApplication) => {
			const { data } = await apiClient.post<TutorApplication>(
				"/api/tutor_application_service",
				application
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Application created");
		},
	});

	const acceptTutorApplication = useMutation({
		mutationKey: ["acceptTutorApplication"],
		mutationFn: async (id: number) => {
			const { data } = await apiClient.post<number>(
				"/api/tutor_application_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Application acceepted");
		},
	});

	const rejectTutorApplication = useMutation({
		mutationKey: ["rejectTutorApplication"],
		mutationFn: async (id: number) => {
			const { data } = await apiClient.post<number>(
				"/api/tutor_application_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Application rejected");
		},
	});

	const removeTutorApplication = useMutation({
		mutationKey: ["removeTutorApplication"],
		mutationFn: async (id: number) => {
			const { data } = await apiClient.post<number>(
				"/api/tutor_application_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Application removed");
		},
	});

	const getTutorApplication = useQuery({
		queryKey: ["getTutorApplication"],
		queryFn: async () => {
			const { data } = await apiClient.get<TutorApplication[]>(
				`/api/tutor_application_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	return {
		createTutorApplication,
		acceptTutorApplication,
		rejectTutorApplication,
		removeTutorApplication,
		getTutorApplication,
	};
};
