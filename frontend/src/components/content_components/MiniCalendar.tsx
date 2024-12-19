import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Theme, useTheme } from "@mui/material";
import { MeetingType } from "~/types/entity_types";
import { useAuth } from "~/api/authentication/useAuth";

type MiniCalenderProps = {
	meetings: MeetingType[];
};

export default function MiniCalendar({ meetings }: MiniCalenderProps) {
	const { userState } = useAuth();
	const theme = useTheme<Theme>();
	return (
		<Paper
			data-testid="mini-calendar"

			elevation={0}
			sx={{
				width: "100%",
				padding: 0,
				height: "100%",
				maxHeight: "100%",
				maxWidth: "100%",
			}}
		>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={"timeGridWeek"}
				initialDate={new Date()}
				height={"100%"}
				events={meetings?.map((meeting) => {
					let backgroundcolor = "";
					let borderColor = "";
					if (meeting?.tutor_user_id == userState.id) {
						backgroundcolor = theme.customColors.tutorColor;
						borderColor = theme.customColors.tutorColor;
					} else {
						backgroundcolor = theme.customColors.tuteeColor;
						borderColor = theme.customColors.tuteeColor;
					}

					return {
						title: "Meeting with " + (userState.id == Number(meeting.tutor_user_id) ? meeting.tutee_name : meeting.tutor_name),
						start: meeting.start_date,
						end: meeting.end_date,
						backgroundColor: backgroundcolor,
						borderColor: borderColor,
					};
				})}
				//events = {event}
				views={{
					timeGridFourDay: {
						type: "timeGrid",
						duration: { days: 4 },
					},
				}}
				headerToolbar={{
					start: "today prev,next", // Left side buttons
					center: "title", // Centered title
					end: "dayGridMonth,timeGridWeek,timeGridDay", // Right side buttons
				}}
			/>
		</Paper>
	);
}
