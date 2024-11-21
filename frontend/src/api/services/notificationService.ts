import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

type NotificationType = {
	//TODO: Implement me
}

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
		getNotifications
	};
};
