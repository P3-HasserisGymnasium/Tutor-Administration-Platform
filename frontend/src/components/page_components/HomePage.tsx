import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { useState } from "react";
import { Box, Button, Typography, ButtonGroup, IconButton, Tooltip, ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArticleIcon from '@mui/icons-material/Article';
import MiniCalendar from "src/components/content_components/HomePageComponents/MiniCalendar";
import MeetingsList from "src/components/content_components/MeetingsList";
import { useCurrentTheme, useBreakpoints } from "~/utilities/helperFunctions";
import CustomButton from "~/components/content_components/CustomButton";
import { useAuth } from "~/api/authentication/useAuth";
import tutorTheme from "~/themes/tutorTheme";
import tuteeTheme from "~/themes/tuteeTheme";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { usePostService } from "~/api/services/post-service";
import { useNavigate } from "react-router-dom";
import { useNotificationService } from "~/api/services/notification-service";

//import ViewCollaborationsDialog from "src/components/page_components/dialogs/ViewCollaborationsDialog";

export default function HomePage() {
	const navigate = useNavigate();
	const theme = useCurrentTheme();
	const tuteeColors = tuteeTheme;
	const tutorColors = tutorTheme;

	const { isMobile } = useBreakpoints();
	const [view, setView] = useState<"list" | "calender">("list");
	const { userState } = useAuth();
	
	// Fetching posts
	const { data: posts,
		isError: postsError } = usePostService().useGetTuteePosts();

	// Fetching collaborations
	const {
		data: tuteeCollaborations,
		isError: TuteeCollabError,
	} = useCollaborationService().useGetCollaborationsWithTutee(userState?.id || null);

	
	const {
		data: tutorCollaborations,
		isError: tutorCollabError,
	} = useCollaborationService().useGetCollaborationsWithTutor(userState?.id || null);


	// Fetching notifications
	const {
		 data: tuteeNotifications,
		 isError: tuteeNotifError,
	 } = useNotificationService().useGetTuteeNotifications(userState?.id || null);

	 const {
		data: tutorNotifications,
		isError: tutorNotifError,
	} = useNotificationService().useGetTutorNotifications(userState?.id || null);


	//  Error States


	if (postsError || TuteeCollabError || tutorCollabError || tuteeNotifError || tutorNotifError) {
		return (
			<Box p={3}>
				<Typography color="error">
					Error loading data. Please try again later.
				</Typography>
			</Box>
		);
	}


	return (
		<ThemeProvider theme={theme}>
			
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
						<Typography variant="h6">{view === "calender" ? "Calendar" : "Meeting List"}</Typography>

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

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "1px solid #white",
						borderRadius: "8px",
						justifyContent: "space-between",
						height: "100%",
						width: "100%",
						backgroundColor: tuteeColors.customColors.postBackGroundColor,
					}}
				>

					<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, backgroundColor: tuteeColors.customColors.buttonColor, borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", color: "white", ml: 2, mt: 2, mr: 2 }}>
							Tutee Overview
						</Typography>
						<CustomButton onClick={() => navigate("/tutee")} variant="contained" sx={{ border: 2, fontSize: "18px", alignItems: "right", backgroundColor: tuteeColors.customColors.buttonColor, color: "white", borderColor: "white", margin: 2 }}>
							Go To Tutee Page
						</CustomButton>
					</Box>

					<Box sx={{ display: "flex", width: "100%", height: "100%" }}>

						{/* Posts */}
						<Box sx={{ display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: 'flex-end', width: 1 / 3, height: "80%" }}>
							<ArticleIcon sx={{ fontSize: 100, color: "#000" }} />
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{posts?.length || 0}
							</Typography>
							<Typography variant="body1">posts</Typography>
						</Box>

						{/* Notifications */}
						<Box sx={{ display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: 'flex-start', width: 1 / 3, height: "80%", marginTop: 5 }}>
							<NotificationsIcon sx={{ fontSize: 100, color: "#000" }} />
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{tuteeNotifications?.length || 0}
							</Typography>
							<Typography variant="body1">Notifications</Typography>
						</Box>

						{/* Collaborations */}
						<Box sx={{ display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: 'flex-end', width: 1 / 3, height: "80%" }}>
							<PeopleIcon sx={{ fontSize: 100, color: "#000" }} />
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{tuteeCollaborations?.length || 0}
							</Typography>
							<Typography variant="body1">collaborations</Typography>

						</Box>
					</Box>


				</Box>



				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "1px solid #white",
						borderRadius: "8px",
						justifyContent: "space-between",
						height: "100%",
						width: "100%",
						backgroundColor: tutorColors.customColors.postBackGroundColor,
					}}
				>

					<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, backgroundColor: tutorColors.customColors.buttonColor, borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
						<Typography variant="h6" sx={{ fontWeight: "bold", color: "white", ml: 2, mt: 2, mr: 2 }}>
							Tutor Overview
						</Typography>
						<CustomButton onClick={() => navigate("/tutor")} variant="contained" sx={{ border: 2, fontSize: "18px", alignItems: "right", backgroundColor: tutorColors.customColors.buttonColor, color: "white", borderColor: "white", margin: 2 }}>
							Go To Tutor Page
						</CustomButton>
					</Box>

					<Box sx={{ display: "flex", width: "100%", height: "100%" }}>


						{/* Notifications */}
						<Box sx={{ display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: 'flex-end', width: 1 / 2, height: "80%" }}>
							<NotificationsIcon sx={{ fontSize: 100, color: "#000" }} />
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{tutorNotifications?.length || 0}
							</Typography>
							<Typography variant="body1">Notifications</Typography>
						</Box>

						{/* Collaborations */}
						<Box sx={{ display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: 'flex-end', width: 1 / 2, height: "80%" }}>
							<PeopleIcon sx={{ fontSize: 100, color: "#000" }} />
							<Typography variant="h6" sx={{ fontWeight: "bold" }}>
								{tutorCollaborations?.length || 0}
							</Typography>
							<Typography variant="body1">collaborations</Typography>

						</Box>
					</Box>


				</Box>

				
			</MediumShortOnShortBoxLayout>
		</ThemeProvider>
	);
}


