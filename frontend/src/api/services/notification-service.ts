import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { NotificationResponseType } from "~/types/entity_types";
import { useRolePrefix } from "~/utilities/helperFunctions";

export const useNotificationService = () => {

	const useNotifications = () => {
		const rolePrefix = useRolePrefix();
		if (rolePrefix === "/tutee") {
			return useGetTuteeNotifications;
		} else if (rolePrefix === "/tutor") {
			return useGetTutorNotifications;
		} else if (rolePrefix === "/admin") {
			return useGetNotifications;
		} else {
			return useGetBothNotifications;
		};
	};




	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const useGetNotifications = (_id: number | null) => {
		return useQuery({
			queryKey: ["getNotifications"],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/all`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			staleTime: 60000, // Data is considered fresh for 60 seconds
			placeholderData: [],
		})
	};
	const useGetTuteeNotifications = (id: number | null) => useQuery({
		queryKey: ["getTuteeNotifications", id],
		queryFn: async () => {
			const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/sentToTutee/${id}`);
			return data;
		},
		refetchOnWindowFocus: false,
		refetchInterval: 60000, // Refetch every minute
		placeholderData: [],
		staleTime: 60000, // Data is considered fresh for 60 seconds
		enabled: id !== null,
	});
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
			enabled: id !== null,
			staleTime: 60000, // Data is considered fresh for 60 seconds
		});
	};

	const useGetBothNotifications = (userId: number | null) => {
		return useQuery({
			queryKey: ["getBothNotifications", userId],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationResponseType[]>(`/api/notifications/sentToBoth/${userId}`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			placeholderData: [],
			enabled: userId !== null,
			staleTime: 60000, // Data is considered fresh for 60 seconds
		});
	}

	return { useNotifications, useGetTuteeNotifications, useGetNotifications, useGetTutorNotifications };
}

