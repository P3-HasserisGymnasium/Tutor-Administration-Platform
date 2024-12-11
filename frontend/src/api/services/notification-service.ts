import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { NotificationResponseType } from "~/types/entity_types";

export const useNotificationService = () => {
	const useGetNotifications = (id: number | null) => {
		return useQuery({
			queryKey: ["getNotifications", id],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/sentTo/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			staleTime: 60000, // Data is considered fresh for 60 seconds
			placeholderData: [],
			enabled: !!id,
		});
	};

	const useGetTuteeNotifications = (id: number | null) => {
		return useQuery({
			queryKey: ["getTuteeNotifications", id],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/sentToTutee/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			placeholderData: [],
			staleTime: 60000, // Data is considered fresh for 60 seconds
			enabled: !!id,
		});
	}

	const useGetTutorNotifications = (id: number | null) => {
		return useQuery({
			queryKey: ["getTutorNotifications", id],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/sentToTutor/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			placeholderData: [],
			enabled: !!id,
			staleTime: 60000, // Data is considered fresh for 60 seconds
		});
	};

	return { useGetNotifications, useGetTuteeNotifications, useGetTutorNotifications };
}

