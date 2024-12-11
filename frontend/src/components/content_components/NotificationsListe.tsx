//import { useNotificationService } from "~/api/services/notification-service";
import { Box, Typography, Paper, CircularProgress, Divider } from "@mui/material";

//import { NotificationState } from "~/types/data_types";
import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";
import { NotificationType } from "~/types/entity_types";

const mockNotification: NotificationType[] = [
    {
        id: 1,
        sender_id: 2,
        sender_type: "Tutor",
        receiver_id: 5,
        receiver_type: "Tutee",
        context_id: 5,
        context_type: "TutorApplication",
        state: "Unread",
    },
    {
        id: 2,
        sender_id: 3,
        sender_type: "Admin",
        receiver_id: 5,
        receiver_type: "Tutee",
        context_id: 6,
        context_type: "Meeting",
        state: "Read",
    },{
        id: 2,
        sender_id: 3,
        sender_type: "Admin",
        receiver_id: 5,
        receiver_type: "Tutee",
        context_id: 6,
        context_type: "Meeting",
        state: "Read",
    }
];

export default function NotificationsList() {
	const theme = useTheme<Theme>();
    const { userState } = useAuth();

	/*const { data: Notifications, isLoading, error } = useNotificationService().useGetNotifications(userState?.id || null);
	

	const userNotifications = Notifications?.filter((Notifications) => {
		return Notifications.state === NotificationState.Enum.Unread;
	});

if (isLoading) return <CircularProgress />;
if (error) return <Typography color="error">Failed to load Notifications.</Typography>;
if (userNotifications?.length === 0) return <Typography>No New Notifications.</Typography>;*/

    return(
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      {mockNotification.map((notification) => (
        <Box
          key={notification.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor:
              notification.state === "Unread" ? "#e3f2fd" : "#f5f5f5",
            padding: 2,
            borderRadius: 2,
            marginBottom: 2,
            borderLeft: `5px solid ${
              notification.state === "Unread"
                ? theme.palette.primary.main
                : theme.palette.grey[400]
            }`,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: notification.state === "Unread" ? "bold" : "normal",
                color: theme.palette.text.primary,
              }}
            >
              {notification.context_type}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {/*notification.timestamp*/}
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginX: 2, borderColor: theme.palette.grey[300] }}
          />

          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, whiteSpace: "nowrap" }}
          >
            Sender: {notification.sender_type}
          </Typography>
        </Box>
      ))}
    </Paper>
    );
    

}
