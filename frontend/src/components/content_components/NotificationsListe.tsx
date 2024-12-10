import { useNotificationService } from "~/api/services/notification-service";
import { Box, Typography, Paper, CircularProgress, Divider } from "@mui/material";

import { NotificationState } from "~/types/data_types";
import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";

export default function NotificationsList() {
	const theme = useTheme<Theme>();
    const { userState } = useAuth();

	const { data: Notifications, isLoading, error } = useNotificationService().useGetNotifications(userState?.id || null);
	

	const userNotifications = Notifications?.filter((Notifications) => {
		return Notifications.state === NotificationState.Enum.Unread;
	});

	if (error) return <Typography color="error">Failed to load of Notifications.</Typography>;
	if (userNotifications?.length === 0) return <Typography>No New Notifications.</Typography>;
	if (isLoading) return <CircularProgress />;
    

	return (
		<Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
			{userNotifications?.map((Notifications) => (
				<Box
					key={Notifications?.id + Notifications.sender_type}
					sx={{
						display: "flex",
						flexDirection: "row",
						backgroundColor: "#f5f5f5",
						padding: 1,
						borderRadius: 2,
						marginBottom: 2,
						borderLeft: `5px solid ${
							Notifications.receiver_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor
						}`,
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
						<Typography
							variant="body1"
							sx={{
								fontWeight: "bold",
								color:
                                Notifications.receiver_id == userState.id
										? theme.customColors.darkTuteeColor
										: theme.customColors.darkTutorColor,
							}}
						>
							{Notifications.context_type}
						</Typography>
					</Box>
					<Divider
						sx={{
							border: `1px solid ${
								Notifications.receiver_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor
							} `,
							mx: 1,
						}}
						orientation="vertical"
						flexItem
					/>
					
				</Box>
			))}
		</Paper>
	);
}
