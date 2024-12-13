//import { MeetingObjectType } from "~/types/entity_types";
//import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";
import { MeetingType } from "~/types/entity_types";

type MeetingsListProps = {
  meetings: MeetingType[];
};

export default function MeetingsList({ meetings }: MeetingsListProps) {
  const theme = useTheme<Theme>();
  const { userState } = useAuth();

  return (
    <Paper elevation={0} sx={{ padding: 2, borderRadius: 2, overflow: "auto", width: "100%", height: "90%" }}>
      {meetings?.map((meeting) => (
        <Box
          key={meeting.id + meeting.end_timestamp}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f5f5f5",
            padding: 1,
            width: "90%",
            borderRadius: 2,
            marginBottom: 4,
            borderLeft: `5px solid ${meeting.tutee_user_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor}`,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: meeting.tutee_user_id == userState.id ? theme.customColors.darkTuteeColor : theme.customColors.darkTutorColor,
              }}
            >
              {new Date(meeting.end_timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(meeting.start_timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body2">
              {new Date(meeting.start_timestamp).toLocaleDateString([], {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Box>
          <Divider
            sx={{
              border: `1px solid ${meeting.tutee_user_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor} `,
              mx: 1,
            }}
            orientation="vertical"
            flexItem
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                color: `${meeting.tutee_user_id == userState.id ? theme.customColors.darkTuteeColor : theme.customColors.darkTutorColor} !important`,
              }}
              variant="h6"
            >{`Meeting with ${meeting.tutee_user_id == userState.id ? "tutor " + meeting.tutor_name : "tutee " + meeting.tutee_name}`}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}
