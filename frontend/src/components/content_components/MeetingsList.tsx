//import { MeetingObjectType } from "~/types/entity_types";
import { useMeetingService } from "~/api/services/meeting-service";
//import React from "react";
import { Box, Typography, Paper, CircularProgress, Divider } from "@mui/material";

import { MeetingState } from "~/types/data_types";
import { useAuth } from "~/api/authentication/useAuth";
import { useTheme, Theme } from "@mui/material/styles";

export default function MeetingsList() {
	const theme = useTheme<Theme>();
	const { data: meetings, isLoading, error } = useMeetingService().useGetMeetings();
	const { userState } = useAuth();

	const userMeetings = meetings?.filter((meeting) => {
		return meeting.state === MeetingState.Enum.ACCEPTED;
	});

	if (error) return <Typography color="error">Failed to load meetings.</Typography>;
	if (userMeetings?.length === 0) return <Typography>No accepted meetings available.</Typography>;
	if (isLoading) return <CircularProgress />;

	return (
		<Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
			{userMeetings?.map((meeting) => (
				<Box
					key={meeting.id + meeting.partner_name}
					sx={{
						display: "flex",
						flexDirection: "row",
						backgroundColor: "#f5f5f5",
						padding: 1,
						borderRadius: 2,
						marginBottom: 2,
						borderLeft: `5px solid ${
							meeting.tutee_user_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor
						}`,
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
						<Typography
							variant="body1"
							sx={{
								fontWeight: "bold",
								color:
									meeting.tutee_user_id == userState.id
										? theme.customColors.darkTuteeColor
										: theme.customColors.darkTutorColor,
							}}
						>
							{new Date(meeting.end_time).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}{" "}
							-{" "}
							{new Date(meeting.start_time).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</Typography>
						<Typography variant="body2">
							{new Date(meeting.start_time).toLocaleDateString([], {
								day: "numeric",
								month: "short",
								year: "numeric",
							})}
						</Typography>
					</Box>
					<Divider
						sx={{
							border: `1px solid ${
								meeting.tutee_user_id == userState.id ? theme.customColors.tuteeColor : theme.customColors.tutorColor
							} `,
							mx: 1,
						}}
						orientation="vertical"
						flexItem
					/>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography
							sx={{
								color: `${
									meeting.tutee_user_id == userState.id
										? theme.customColors.darkTuteeColor
										: theme.customColors.darkTutorColor
								} !important`,
							}}
							variant="h6"
						>{`Meeting with ${meeting.tutee_user_id == userState.id ? "tutor" : "tutee"} ${
							meeting.partner_name
						}`}</Typography>
					</Box>
				</Box>
			))}
		</Paper>
	);
}
