import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { NotificationType } from "~/types/entity_types";

export const useNotificationService = () => {
	const useGetNotifications = (id: string) => {
		return useQuery({
			queryKey: ["getNotifications", id],
			queryFn: async () => {
				const { data } = await apiClient.get<NotificationType[]>(`/api/notifications/sentTo/${id}`);
				return data;
			},
			refetchOnWindowFocus: false,
			refetchInterval: 60000, // Refetch every minute
			placeholderData: [],
			enabled: !!id,
		});
	};

	return { useGetNotifications };
};
