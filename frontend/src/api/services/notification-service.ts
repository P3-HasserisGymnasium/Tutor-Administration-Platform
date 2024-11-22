import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";
import { NotificationContext } from "~/types/enums";

type NotificationType = {
	notificationContext: NotificationContext;
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
