//import { MeetingObjectType } from "~/types/entity_types";
import { useMeetingService } from "~/api/services/meeting-service";
//import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

import { MeetingState } from "~/types/data_types";

export default function MeetingList() {
	// Fetch meetings from the API

	const { data: meetings, isLoading, error } = useMeetingService().useGetMeetings();

	// Filter accepted meetings based on the "state"
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
						flexDirection: "column",
						backgroundColor: "#f5f5f5",
						padding: 2,
						borderRadius: 2,
						marginBottom: 2,
						borderLeft: "5px solid #3f51b5",
					}}
				>
					<Typography variant="body1" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
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
					<Typography variant="body2" sx={{ marginBottom: 1 }}>
						{new Date(meeting.start_time).toLocaleDateString([], {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</Typography>
					<Typography variant="h6">{`Meeting with tutor ${meeting.partner_name}`}</Typography>
				</Box>
			))}
		</Paper>
	);
}
