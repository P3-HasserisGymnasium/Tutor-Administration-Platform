import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import RequestMeetingDialog from "./dialogs/RequestMeetingDialog";
import { Day, TimeAvailabilityType } from "~/types/data_types";
import { useEffect, useState } from "react";
import EndCollaborationDialog from "./dialogs/EndCollaborationDialog";
import { useBreakpoints, useCurrentTheme } from "~/utilities/helperFunctions";
import { ThemeProvider } from "@emotion/react";
//import ViewCollaborationsDialog from "./dialogs/ViewCollaborationsDialog";
import { Box, Button, ButtonGroup, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import MiniCalendar from "../content_components/MiniCalendar";
import MeetingsList from "../content_components/MeetingsList";
import InfoIcon from "@mui/icons-material/Info";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useRoleService } from "~/api/services/role-service";
import { useAuth } from "~/api/authentication/useAuth";
import { useCollaborationService } from "~/api/services/collaboration-service";


//import { useMeetingService } from "~/api/services/meeting-service";


const mockTimeAvailabilities = [
	{
		day: Day.Enum.Monday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Tuesday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Wednesday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
	{
		day: Day.Enum.Thursday,
		time: [
			{
				start_time: "08:00",
				end_time: "10:00",
			},
		],
	},
];

const meetings = [
	{
		start_time: '2024-12-11T10:00:00',
		end_time: '2024-12-11T11:00:00',
		id: 1,
		state: 'PENDING',
		collaboration_id: 101,
		partner_name: 'John Doe',
		tutee_user_id: 202,
		tutor_user_id: 301,
		meeting_description: 'Math Tutoring Session',
	},
	{
		start_time: '2024-12-11T13:00:00',
		end_time: '2024-12-11T14:00:00',
		id: 2,
		state: 'ACCEPTED',
		collaboration_id: 102,
		partner_name: 'Jane Smith',
		tutee_user_id: 202,
		tutor_user_id: 302,
		meeting_description: 'Science Homework Help',
	},
	{
		start_time: '2025-12-11T15:00:00',
		end_time: '2025-12-11T16:00:00',
		id: 3,
		state: 'REJECTED',
		collaboration_id: 103,
		partner_name: 'Emily Johnson',
		tutee_user_id: 202,
		tutor_user_id: 303,
		rejection_reason: 'Scheduling Conflict',
		meeting_description: 'English Essay Review',
	},
];

export default function CollaborationPage() {
	const theme = useCurrentTheme();
	const [isRequestMeetingDialogOpen, setIsRequestMeetingDialogOpen] = useState(false);
	const [isEndCollaborationDialogOpen, setIsEndCollaborationDialogOpen] = useState(false);
	const [view, setView] = useState<"list" | "calender">("list");
	const { isMobile } = useBreakpoints();
	const params = useParams()

	const { userState } = useAuth();

	const { data: partnerInformation, isLoading } = useCollaborationService().useGetPartnerInformation(Number(params.org_id))

	console.log("partner", partnerInformation);


	//const { data: meetings, isLoading, error } = useMeetingService().useGetMeetings();
	//userState === tutorid?
	//const {roleData} = useRoleService().getProfile();

	// Categorize meetings into "Upcoming" and "Finished"
	const upcomingMeetings = meetings.filter(
		(meeting) => new Date(meeting.start_time) > new Date()
	  );
	  const finishedMeetings = meetings.filter(
		(meeting) => new Date(meeting.start_time) <= new Date()
	  );


	return (
		<ThemeProvider theme={theme}>
			<RequestMeetingDialog
				open={isRequestMeetingDialogOpen}
				setOpen={setIsRequestMeetingDialogOpen}
				timeAvailabilities={mockTimeAvailabilities}
			/>
			<EndCollaborationDialog
				open={isEndCollaborationDialogOpen}
				setOpen={setIsEndCollaborationDialogOpen}
			/>
			<MediumShortOnShortBoxLayout>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "1px solid #white",
						borderRadius: "8px",
						overflow: "hidden",
						p: isMobile ? 1 : 2,
						position: "relative",
					}}
				>
					{/* Header with Title and Buttons */}
					<Box sx={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 17 }}>
						<Typography sx={{ fontWeight: 'bold' }} variant="h6">{view === "calender" ? "Calendar" : "Meeting List"}</Typography>

						{/* Button group for toggling between calendar and meeting */}
						<ButtonGroup variant="outlined" aria-label="outlined primary button group">
							<Button
								sx={{
									color: theme.palette.text.primary, // Dynamically use the theme's text color
									backgroundColor: view === "list" ? theme.palette.primary.main : theme.palette.background.paper,
									"&:hover": {
										backgroundColor: view === "list" ? theme.palette.primary.light : theme.palette.action.hover,
									},
								}}
								onClick={() => setView("calender")}
							>
								Show Calendar
							</Button>

							<Button
								sx={{
									color: theme.palette.text.primary,
									backgroundColor: view === "calender" ? theme.palette.primary.main : theme.palette.background.paper,
									"&:hover": {
										backgroundColor: view === "calender" ? theme.palette.primary.light : theme.palette.action.hover,
									},
								}}
								onClick={() => setView("list")}
							>
								Show Meetings
							</Button>
						</ButtonGroup>

						<Tooltip
							title="Your schedule showcases all of your meetings across all your collaborations, as a tutee. Click on a meeting to go to the specific collaboration."
							arrow
						>
							<IconButton
								sx={{
									position: "absolute",
									top: 8,
									right: 8,
									alignItems: "right",
								}}
								aria-label="info"
							>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</Box>
					<Box
						sx={{
							position: "flex",
							alignContent: "center",
							alignItems: "center",
							border: "white 1px",
							overflow: "hidden",
						}}
					>
						{view === "calender" ? <MiniCalendar /> : <MeetingsList />}
					</Box>
				</Box>


				<Box sx={{ padding: 2, maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
					<Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', display: "flex", alignItems: "left" }}>
						Communcation
					</Typography>
				</Box>

				<Box sx={{ padding: 2, maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
					<Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', display: "flex", alignItems: "left" }}>
						Meetings
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
						{/* Upcoming Meetings Section */}
						<Box sx={{ flex: 1, marginRight: 1 }}>
							<Typography variant="subtitle1" sx={{ marginBottom: 1, display: "flex", alignItems: "left" }}>
								Upcoming
							</Typography>
							{upcomingMeetings.map((meeting) => (
								<Paper
									key={meeting.id}
									elevation={2}
									sx={{
										padding: 1.5,
										marginBottom: 1,
										backgroundColor: '#f5f5dc', // Light beige
									}}
								>
									<Typography>{`${new Date(meeting.start_time).toLocaleDateString('en-US', {
										weekday: 'long',
										month: 'long',
										day: 'numeric',
									})}`}</Typography>
									<Typography>{`${new Date(meeting.start_time).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})} - ${new Date(meeting.end_time).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}`}</Typography>
								</Paper>
							))}
						</Box>
						{/* Finished Meetings Section */}
						<Box sx={{ flex: 1, marginLeft: 1 }}>
							<Typography variant="subtitle1" sx={{ marginBottom: 1, display: "flex", alignItems: "left" }}>
								Finished
							</Typography>
							{finishedMeetings.map((meeting) => (
								<Paper
									key={meeting.id}
									elevation={2}
									sx={{
										padding: 1.5,
										marginBottom: 1,
										backgroundColor: '#f5f5dc', // Light beige
									}}
								>
									<Typography>{`${new Date(meeting.start_time).toLocaleDateString('en-US', {
										weekday: 'long',
										month: 'long',
										day: 'numeric',
									})}`}</Typography>
									<Typography>{`${new Date(meeting.start_time).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})} - ${new Date(meeting.end_time).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}`}</Typography>
								</Paper>
							))}
						</Box>
					</Box>
				</Box>

			</MediumShortOnShortBoxLayout>
		</ThemeProvider>
	);
}


function setError(arg0: any) {
	throw new Error("Function not implemented.");
}

