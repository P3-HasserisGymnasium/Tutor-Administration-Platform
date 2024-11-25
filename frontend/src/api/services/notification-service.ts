import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { NotificationContextType } from "~/types/data_types";


type NotificationType = {
	notificationContext: NotificationContextType;
	participants: number; // As ID's
};

export const useNotificationService = () => {
	const getNotifications = useQuery({
		queryKey: ["getNotifications"],
		queryFn: async () => {
			const { data } = await apiClient.get<NotificationType[]>(
				`/api/notification_service`
			);
			return data;
		},
		refetchOnWindowFocus: false,
		placeholderData: [],
	});

	return {
		getNotifications,
	};
};
