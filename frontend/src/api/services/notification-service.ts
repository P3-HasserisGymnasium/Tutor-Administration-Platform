import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { NotificationType } from "~/types/entity_types";

export const useNotificationService = () => {
	const useGetNotifications = () => {
		return useQuery({
			queryKey: ["getNotifications"],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationType[]>(`/api/notifications`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			placeholderData: [],
		});
	};

	return { useGetNotifications };
};
