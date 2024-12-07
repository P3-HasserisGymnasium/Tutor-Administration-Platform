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
				const { data } = await apiClient.post("/api/meeting", meeting);
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

	const useCancelMeeting = () => {
		return useMutation({
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
	};

	const useAcceptMeeting = () => {
		return useMutation({
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
	};

	const useRejectMeeting = () => {
		return useMutation({
			mutationKey: ["rejectMeeting"],
			mutationFn: async (meetingId: number) => {
				await apiClient.delete(`/api/meeting_service/${meetingId}`);
			},
			onError: (e: AxiosError<{ detail: string }>) => {
				toast.error(e?.response?.data?.detail);
			},
			onSuccess: () => {
				toast.success("Møde afvist");
			},
		});
	};

	const useGetMeetings = () => {
		return useQuery({
			queryKey: ["getMeetings"],
			queryFn: async () => {
				const { data } = await apiClient.get<MeetingType[]>(`/api/meeting_service`);
				return data;
			},
			refetchOnWindowFocus: false,
			placeholderData: [],
		});
	};

	return {
		useRequestMeeting,
		useCancelMeeting,
		useAcceptMeeting,
		useRejectMeeting,
		useGetMeetings,
	};
};
