import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { PostType, CollaborationType, Feedback, TerminationType } from "~/types/entity_types";

export const useCollaborationService = () => {
	//Admin requests a collaboration
	const submitCollaborationSuggestion = useMutation({
		mutationKey: ["submitCollaborationSuggestion"],
		mutationFn: async (collaboration: CollaborationType) => {
			const { data } = await apiClient.post<CollaborationType>("/api/collaboration", collaboration);
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
		mutationFn: async (id: number) => {
			const { data } = await apiClient.post<number>("/api/collaboration", id);
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
		mutationFn: async (id: number) => {
			const { data } = await apiClient.post<number>("/api/collaboration", id);
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
			const { data } = await apiClient.post<PostType>("/api/collaboration", collaborationSuggestionRequest);

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
		mutationFn: async (collaboration: CollaborationType) => {
			const { data } = await apiClient.post<CollaborationType>("/api/collaboration", collaboration);

			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Collaboration requested");
		},
	});

	const useTerminateCollaboration = () => {
		return useMutation({
			mutationKey: ["terminateCollaboration"],
			mutationFn: async ({ id, terminationReason }: TerminationType) => {
				const { data } = await apiClient.post<string>("/api/collaboration/terminate" + id, terminationReason);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Collaboration terminated");
			},
		});
	};

	const submitFeedback = useMutation({
		mutationKey: ["submitFeedback"],
		mutationFn: async (feedback: Feedback) => {
			const { data } = await apiClient.post<Feedback>("/api/collaboration", feedback);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Feedback submitted");
		},
	});

	const useGetCollaborationsWithTutee = (id: number | null) => {
		return useQuery({
			queryKey: ["getCollaborationsWithTutee", id],
			queryFn: async ({ queryKey }) => {
				const id = queryKey[1];
				const { data } = await apiClient.get<CollaborationType[]>(`/api/collaboration/with_tutee/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
			enabled: !!id,
		});
	};

	const useGetCollaborationsWithTutor = (id: number | null) => {
		return useQuery({
			queryKey: ["getCollaborationsWithTutee", id],
			queryFn: async ({ queryKey }) => {
				const id = queryKey[1];
				const { data } = await apiClient.get<CollaborationType[]>(`/api/collaboration/with_tutor/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
			enabled: !!id,
		});
	};

	return {
		useGetCollaborationsWithTutee,
		useGetCollaborationsWithTutor,
		submitCollaborationSuggestion,
		acceptCollaboration,
		rejectCollaboration,
		requestCollaborationSuggestion,
		requestCollaboration,
		useTerminateCollaboration,
		submitFeedback,
	};
};
