import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../api-client";
import { MeetingType } from "~/types/entity_types";

export const useMeetingService = () => {
	const useRequestMeeting = () => {
		return useMutation({
			mutationKey: ["requestMeeting"],
			mutationFn: async (meeting: MeetingType) => {
				const { data } = await apiClient.post("/api/meeting/request", meeting);
				console.log("form here data", data);
				return data;
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: (data) => {
				toast.success(data);
			},
		});
	};

	const cancelMeeting = useMutation({
		mutationKey: ["cancelMeeting"],
		mutationFn: async (meetingId: number) => {
			await apiClient.delete(`/api/meeting_service/${meetingId}`);
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Møde aflyst");
		},
	});

	const acceptMeeting = useMutation({
		mutationKey: ["acceptMeeting"],
		mutationFn: async (meetingId: number) => {
			await apiClient.delete(`/api/meeting_service/${meetingId}`);
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Møde accepteret");
		},
	});

	const rejectMeeting = useMutation({
		mutationKey: ["rejectMeeting"],
		mutationFn: async (meetingId: number) => {
			await apiClient.delete(`/api/meeting_service/${meetingId}`);
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Møde accepteret");
		},
	});

	const getMeetings = useQuery({
		queryKey: ["getMeetings"],
		queryFn: async () => {
			const { data } = await apiClient.get<MeetingType[]>(`/api/meeting_service`);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	return {
		useRequestMeeting,
		cancelMeeting,
		acceptMeeting,
		rejectMeeting,
		getMeetings,
	};
};
