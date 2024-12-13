import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import {
	PostType,
	CollaborationType,
	Feedback,
	TerminationType,
	RequestCollaborationByPostType,
	RequestCollaborationByTutorType,
	TutorProfileType,
} from "~/types/entity_types";
import { Role } from "~/types/data_types";
import { z } from "zod";

export const useCollaborationService = () => {
	//Admin wants to get pairing help requests
	const getCollaborationSuggestionRequests = () => {
		return useQuery({
			queryKey: ["getCollaborationSuggestions"],
			queryFn: async () => {
				const { data } = await apiClient.get<CollaborationType[]>(
					`/api/collaboration/pairing_requests`
				);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		})
	};

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

	type RoleType = z.infer<typeof Role>;
	const acceptCollaboration = useMutation({
		mutationKey: ["acceptCollaboration"],
		mutationFn: async ({ id, role }: { id: number; role: RoleType }) => {
			const { data } = await apiClient.post(`/api/collaboration/accept/${id}/${role}`);
			return data;
		},
		onError: (e: AxiosError) => {
			toast.error("" + e?.response?.data);
		},
		onSuccess: () => {
			toast.success("Collaboration accepted");
		},
	});

	const rejectCollaboration = useMutation({
		mutationKey: ["rejectCollaboration"],
		mutationFn: async ({ id, role }: { id: number; role: RoleType }) => {
			const { data } = await apiClient.post(`/api/collaboration/reject/${id}/${role}`);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.info("Collaboration rejected");
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

	const useGetPartnerInformation = (collaborationId: number | null) => {
		return useQuery({
			queryKey: ["getPartnerInformation", collaborationId],
			queryFn: async () => {
				const { data } = await apiClient.get<TutorProfileType>(`/api/collaboration/partner/${collaborationId}`);
				return data;
			},
			refetchOnWindowFocus: false,
			enabled: !!collaborationId,
		});
	}

	//Tutor or tutee wants a collab
	const useRequestCollaborationViaTutor = () => {
		return useMutation({
			mutationKey: ["requestCollaborationViaTutor"],
			mutationFn: async (collaboration: RequestCollaborationByTutorType) => {
				const { data } = await apiClient.post<CollaborationType>("/api/collaboration/request/by-tutor", collaboration);
				return data;
			},
			onSuccess: () => {
				toast.success("Collaboration requested");
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
		});
	};

	const useRequestCollaborationViaPost = () => {
		return useMutation({
			mutationKey: ["requestCollaborationViaPost"],
			mutationFn: async (collaboration: RequestCollaborationByPostType) => {
				const { data } = await apiClient.post<CollaborationType>("/api/collaboration/request/by-post", collaboration);
				return data;
			},
			onSuccess: () => {
				toast.success("Collaboration requested");
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
			},
		});
	};

	const useTerminateCollaboration = () => {
		return useMutation({
			mutationKey: ["terminateCollaboration"],
			mutationFn: async ({ id, terminationReason }: TerminationType) => {
				const { data } = await apiClient.post<string>("/api/collaboration/terminate/" + id, terminationReason);
				return data;
			},
			onError: (e: AxiosError) => {
				toast.error("" + e?.response?.data);
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
		onError: (e: AxiosError) => {
			toast.error("" + e?.response?.data);
		},
		onSuccess: () => {
			toast.success("Feedback submitted");
		},
	});

	const getCollabortations = () => {
		return useQuery({
			queryKey: ["getCollaborations"],
			queryFn: async () => {
				const { data } = await apiClient.get<CollaborationType[]>(
					`/api/collaboration/all`
				);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		})
	};

	const useGetCollaborationsWithTutee = (id: number | null) => {
		return useQuery({
			queryKey: ["getCollaborationsWithTutee", id],
			queryFn: async () => {
				const { data } = await apiClient.get<CollaborationType[]>(`/api/collaboration/as_tutee`);
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
			queryFn: async () => {
				const { data } = await apiClient.get<CollaborationType[]>(`/api/collaboration/as_tutor`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
			enabled: !!id,
		});
	};

	const useGetCollaborationById = (id: number | null) => {
		return useQuery({
			queryKey: ["getCollaborationById", id],
			queryFn: async () => {
				const { data } = await apiClient.get<CollaborationType>(`/api/collaboration/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			enabled: !!id,
		});
	};

	return {
		getCollaborationSuggestionRequests,
		useGetCollaborationsWithTutee,
		getCollabortations,
		useGetCollaborationsWithTutor,
		submitCollaborationSuggestion,
		acceptCollaboration,
		rejectCollaboration,
		requestCollaborationSuggestion,
		useGetPartnerInformation,
		useRequestCollaborationViaTutor,
		useRequestCollaborationViaPost,
		useTerminateCollaboration,
		useGetCollaborationById,
		submitFeedback,
	};
};
