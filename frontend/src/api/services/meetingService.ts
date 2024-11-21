import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { apiClient } from "../apiClient";
import { MeetingState } from "~/types/enums";

type MeetingType = {
	id: number,
	rejection_reason?: string,
	end_date: Date,
	collaboration_id: number,
	meeting_description?: string,
	state: MeetingState,
	start_date: Date
}

export const useMeetingService = () => {

	const requestMeeting = useMutation({
		mutationKey: ["requestMeeting"],
		mutationFn: async (meeting: MeetingType) => {
			const { data } = await apiClient.post<MeetingType>(
				"/api/meeting_service",
				meeting
			);
			return data;
		},
		onError: (e: AxiosError<{ detail: string }>) => {
			toast.error(e?.response?.data?.detail);
		},
		onSuccess: () => {
			toast.success("Møde anmodet");
		},
	});

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
			const { data } = await apiClient.get<MeetingType[]>(
				`/api/meeting_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	return {
		requestMeeting,
		cancelMeeting,
		acceptMeeting,
		rejectMeeting,
		getMeetings
	};
};
