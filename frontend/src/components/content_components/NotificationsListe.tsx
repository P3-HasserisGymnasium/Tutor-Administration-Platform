//import { useNotificationService } from "~/api/services/notification-service";
import { Box, Typography, Paper, Divider, CircularProgress } from "@mui/material";

//import { NotificationState } from "~/types/data_types";
//import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";
import { useAuth } from "~/api/authentication/useAuth";
import { useNotificationService } from "~/api/services/notification-service";
import { generateNotificationMessage } from "~/utilities/helperFunctions";
/* 
const mockNotification: NotificationResponseType[] = [
  {
    id: 1,
    sender_id: 2,
    sender_name: "Klaus Hæslig",
    sender_type: "Tutor",
    receiver_id: 5,
    receiver_name: "Mikkel Møller",
    receiver_type: "Tutee",
    context_id: 5,
    context_type: "TutorApplication",
    state: "Unread",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Louise Lækker",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Mikkel Karlsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Klara Tauson",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Karlsen Mikkelsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 1,
    sender_id: 2,
    sender_name: "Klaus Hæslig",
    sender_type: "Tutor",
    receiver_id: 5,
    receiver_name: "Mikkel Møller",
    receiver_type: "Tutee",
    context_id: 5,
    context_type: "TutorApplication",
    state: "Unread",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Louise Lækker",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Mikkel Karlsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Klara Tauson",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Karlsen Mikkelsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 1,
    sender_id: 2,
    sender_name: "Klaus Hæslig",
    sender_type: "Tutor",
    receiver_id: 5,
    receiver_name: "Mikkel Møller",
    receiver_type: "Tutee",
    context_id: 5,
    context_type: "TutorApplication",
    state: "Unread",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Louise Lækker",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Mikkel Karlsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Klara Tauson",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Karlsen Mikkelsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 1,
    sender_id: 2,
    sender_name: "Klaus Hæslig",
    sender_type: "Tutor",
    receiver_id: 5,
    receiver_name: "Mikkel Møller",
    receiver_type: "Tutee",
    context_id: 5,
    context_type: "TutorApplication",
    state: "Unread",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Louise Lækker",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Mikkel Karlsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Klara Tauson",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Karlsen Mikkelsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 1,
    sender_id: 2,
    sender_name: "Klaus Hæslig",
    sender_type: "Tutor",
    receiver_id: 5,
    receiver_name: "Mikkel Møller",
    receiver_type: "Tutee",
    context_id: 5,
    context_type: "TutorApplication",
    state: "Unread",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Louise Lækker",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Mikkel Karlsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
  {
    id: 2,
    sender_id: 3,
    sender_name: "Klara Tauson",
    sender_type: "Admin",
    receiver_id: 5,
    receiver_name: "Karlsen Mikkelsen",
    receiver_type: "Tutee",
    context_id: 6,
    context_type: "Meeting",
    state: "Read",
  },
]; */

export default function NotificationsList() {
  const theme = useTheme<Theme>();
  const { useNotifications } = useNotificationService();
  const { userState } = useAuth();

  const { data: notifications, isLoading, isError } = useNotifications()(userState.id);

  if (isLoading) return <CircularProgress />;
  if (isError || !notifications) return <Typography color="error">Failed to load Notifications.</Typography>;

  return (
    <Box
      sx={{
        width: "95%",
        height: "calc(100% - 32px)",
        overflowY: "scroll",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "auto",
      }}
    >
      <Paper sx={{ width: "100%", height: "100%" }}>
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: notification.state === "Unread" ? "#e3f2fd" : "#f5f5f5",
              height: "60px",
              borderRadius: 2,
              marginBottom: 2,
              px: 2,
              borderLeft: `5px solid ${notification.state === "Unread" ? theme.palette.primary.main : theme.palette.grey[400]}`,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: notification.state === "Unread" ? "bold" : "normal",
                  color: theme.palette.text.primary,
                  overflow: "hidden",
                  pr: 2,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {notification.context_type}: {generateNotificationMessage(notification)}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                {/*notification.timestamp*/}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", height: "100%", alignItems: "center" }}>
              <Typography variant="body2" sx={{ fontWeight: notification.state === "Unread" ? "bold" : "normal", whiteSpace: "nowrap" }}>
                Status: {notification.state}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ marginX: 2, my: 1, borderWidth: "1px", borderColor: theme.palette.grey[600] }} />

              <Typography
                variant="body2"
                sx={{
                  width: "170px",
                  fontWeight: notification.state === "Unread" ? "bold" : "normal",
                  overflow: "hidden",
                  pr: 2,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                Afsender: {notification.sender_name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
