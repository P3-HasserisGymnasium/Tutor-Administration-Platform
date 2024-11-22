import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { PostType, Subject } from "~/types/enums";

type Collaboration = {
	end_date?: Date;
	tutee_id: number;
	start_date?: Date;
	tutor_id: number;
	state: CollaborationState;
	subject: Subject;
};

type Feedback = {
	id: number;
	feedback: string;
};

enum CollaborationState {
	PENDING,
	WAITING_FOR_TUTOR,
	WAITING_FOR_TUTEE,
	ACCEPTED,
	REJECTED,
	TERMINATED,
}

export const useCollaborationService = () => {
	//Admin requests a collaboration
	const submitCollaborationSuggestion = useMutation({
		mutationKey: ["submitCollaborationSuggestion"],
		mutationFn: async (collaboration: Collaboration) => {
			const { data } = await apiClient.post<Collaboration>(
				"/api/collaboration_service",
				collaboration
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration suggestion submitted");
		},
	});

	const acceptCollaboration = useMutation({
		mutationKey: ["acceptCollaboration"],
		mutationFn: async (id: Number) => {
			const { data } = await apiClient.post<Number>(
				"/api/collaboration_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration accepted");
		},
	});

	const rejectCollaboration = useMutation({
		mutationKey: ["rejectCollaboration"],
		mutationFn: async (id: Number) => {
			const { data } = await apiClient.post<Number>(
				"/api/collaboration_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration rejected");
		},
	});

	//Tutee wants a suggestion for collab
	const requestCollaborationSuggestion = useMutation({
		mutationKey: ["requestCollaborationSuggestion"],
		mutationFn: async (collaborationSuggestionRequest: PostType) => {
			const { data } = await apiClient.post<PostType>(
				"/api/collaboration_service",
				collaborationSuggestionRequest
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration suggestion requested");
		},
	});

	//Tutor or tutee wants a collab
	const requestCollaboration = useMutation({
		mutationKey: ["requestCollaboration"],
		mutationFn: async (collaboration: Collaboration) => {
			const { data } = await apiClient.post<Collaboration>(
				"/api/collaboration_service",
				collaboration
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration requested");
		},
	});

	const terminateCollaboration = useMutation({
		mutationKey: ["terminateCollaboration"],
		mutationFn: async (id: Number) => {
			const { data } = await apiClient.post<Number>(
				"/api/collaboration_service",
				id
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration terminated");
		},
	});

	const submitFeedback = useMutation({
		mutationKey: ["submitFeedback"],
		mutationFn: async (feedback: Feedback) => {
			const { data } = await apiClient.post<Feedback>(
				"/api/collaboration_service",
				feedback
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Feedback submitted");
		},
	});

	const getCollaborations = useQuery({
		queryKey: ["getCollaborations"],
		queryFn: async () => {
			const { data } = await apiClient.get<Collaboration[]>(
				`/api/post_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	return {
		submitCollaborationSuggestion,
		acceptCollaboration,
		rejectCollaboration,
		requestCollaborationSuggestion,
		requestCollaboration,
		terminateCollaboration,
		submitFeedback,
		getCollaborations,
	};
};
