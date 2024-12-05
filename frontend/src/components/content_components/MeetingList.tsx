import { MeetingObjectType } from "~/types/entity_types";
import { useMeetingService } from "~/api/services/meeting-service";
import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";

export default function MeetingList(){

    const [selectedTab, setSelectedTab] = React.useState(0);

  // Fetch meetings from the API
  const { getMeetings } = useMeetingService();
  const { data: meetings, isLoading, error } = getMeetings;
  console.log(meetings)
  const {userState} = useAuth();

  const currentUser = userState;


  // Filter accepted meetings based on the "state"
  const userMeetings = Array.isArray(meetings)
  ? meetings.filter(
      (meeting) =>
        meeting.meeting_info.state === "Accepted" &&
        (meeting.tutor_id === currentUser.id || meeting.tutee_id === currentUser.id)
    )
  : [];  console.log(meetings)


    return (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">Failed to load meetings.</Typography>
          ) : userMeetings.length > 0 ? (
            userMeetings.map((meeting) => (
              <Box
                key={meeting.meeting_info.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#f5f5f5",
                  padding: 2,
                  borderRadius: 2,
                  marginBottom: 2,
                  borderLeft: "5px solid #3f51b5",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#3f51b5" }}
                >
                  {new Date(meeting.meeting_info.start_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(meeting.meeting_info.end_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  {new Date(meeting.meeting_info.start_date).toLocaleDateString([], {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>
                <Typography variant="h6">{`Meeting with tutor ${meeting.tutor_name}`}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No accepted meetings available.</Typography>
          )}
        </Paper>
      );
}
