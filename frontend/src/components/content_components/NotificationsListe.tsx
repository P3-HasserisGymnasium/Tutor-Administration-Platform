//import { useNotificationService } from "~/api/services/notification-service";
import { Box, Typography, Paper, Divider, CircularProgress } from "@mui/material";

//import { NotificationState } from "~/types/data_types";
//import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";
import { useAuth } from "~/api/authentication/useAuth";
import { useNotificationService } from "~/api/services/notification-service";
import { generateNotificationMessage } from "~/utilities/helperFunctions";
import { useState } from "react";
import AcceptInvitationFromTutorDialog from "../page_components/dialogs/AcceptInvitationFromTutorDialog";
import AcceptInvitationFromTuteeDialog from "../page_components/dialogs/AcceptInvitationFromTuteeDialog";
import { NotificationResponseType } from "~/types/entity_types";
import { NotificationContext, NotificationParticipant, NotificationState } from "../../types/data_types";

export default function NotificationsList() {
  const theme = useTheme<Theme>();
  const { useNotifications, useChangeNotificationState } = useNotificationService();
  const { userState } = useAuth();
  const [isAcceptTuteeDialogOpen, setIsAcceptTuteeDialogOpen] = useState(false);
  const [isAcceptTutorDialogOpen, setIsAcceptTutorDialogOpen] = useState(false);
  const [collaboration_id, setCollaboration_id] = useState<number | null>(null);
  const [tutor_id, setTutor_id] = useState<number | null>(null);
  const [tutee_id, setTutee_id] = useState<number | null>(null);
  const changeStateMutation = useChangeNotificationState();

  const { data: notifications, isLoading, isError } = useNotifications()(userState.id);

  const handleNotificationClick = (notification: NotificationResponseType) => {
    if (
      (notification.context_type === NotificationContext.Enum.COLLABORATION || notification.context_type === NotificationContext.Enum.POST) &&
      notification.sender_type === NotificationParticipant.Enum.TUTOR
    ) {
      setCollaboration_id(notification.context_id);
      setTutor_id(notification.sender_id);
      setTimeout(() => {
        setIsAcceptTutorDialogOpen(true);
        changeStateMutation.mutate({ notificationId: notification.notification_id, state: NotificationState.Enum.READ });
      }, 0);
      return;
    }

    if (notification.context_type === NotificationContext.Enum.COLLABORATION && notification.sender_type === NotificationParticipant.Enum.TUTEE) {
      setTutee_id(notification.sender_id);
      setCollaboration_id(notification.context_id);
      setTimeout(() => {
        setIsAcceptTuteeDialogOpen(true);
        changeStateMutation.mutate({ notificationId: notification.notification_id, state: NotificationState.Enum.READ });
      }, 0);
      return;
    }
  };

  // Render the list of notifications
  const renderNotifications = () => {
    return notifications?.map((notification) => (
      <Box
        onClick={() => handleNotificationClick(notification)}
        key={notification.notification_id}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: notification.state === "UNREAD" ? theme.customColors.collaborationBackgroundColor : theme.palette.grey[200],
          height: "60px",
          borderRadius: 2,
          marginBottom: 2,
          px: 2,
          borderLeft: `5px solid ${notification.state === "UNREAD" ? theme.palette.primary.main : theme.palette.grey[400]}`,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: notification.state === "UNREAD" ? "bold" : "normal",
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
          <Typography variant="body2" sx={{ fontWeight: notification.state === "UNREAD" ? "bold" : "normal", whiteSpace: "nowrap" }}>
            Status: {notification.state}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2, my: 1, borderWidth: "1px", borderColor: theme.palette.grey[600] }} />

          <Typography
            variant="body2"
            sx={{
              width: "170px",
              fontWeight: notification.state === "UNREAD" ? "bold" : "normal",
              overflow: "hidden",
              pr: 2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            From: {notification.sender_name}
          </Typography>
        </Box>
      </Box>
    ));
  };
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
      <AcceptInvitationFromTutorDialog
        open={isAcceptTutorDialogOpen}
        setOpen={setIsAcceptTutorDialogOpen}
        collaboration_id={collaboration_id}
        tutor_id={tutor_id}
      />
      <AcceptInvitationFromTuteeDialog
        open={isAcceptTuteeDialogOpen}
        setOpen={setIsAcceptTuteeDialogOpen}
        collaboration_id={collaboration_id}
        tutee_id={tutee_id}
      />
      <Paper sx={{ width: "90%", height: "90%" }}>{renderNotifications()}</Paper>
    </Box>
  );
}
