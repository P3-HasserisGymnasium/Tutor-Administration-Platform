import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import React from "react";
import { Box, Button, Typography, ButtonGroup, IconButton, Tooltip, ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
// import tutorTheme from "~/themes/tutorTheme";
import MeetingsList from "../content_components/MeetingList";
import MiniCalendar from "../content_components/HomePageComponents/MiniCalendar";
import MiniPostList from "../content_components/HomePageComponents/MiniPostList";
import MiniCollabList from "../content_components/HomePageComponents/MiniCollabList";
//import { useNavigate } from "react-router-dom";
import { useCurrentTheme, useBreakpoints } from "~/utilities/helperFunctions";
import CustomButton from "../content_components/CustomButton";
import { usePostService } from "~/api/services/post-service";

export default function HomePage() {
	const [view, setView] = React.useState("meeting");
	const theme = useCurrentTheme();
	const { isMobile } = useBreakpoints();

	const handleViewChange = (newView: React.SetStateAction<string>) => {
		setView(newView);
	};

	const { data: posts, isLoading, isError, refetch } = usePostService().useGetTuteePosts();

	//const navigate = useNavigate();

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
						<Typography variant="h6">{view === "calendar" ? "Calendar" : "Meeting List"}</Typography>

						{/* Button group for toggling between calendar and meeting */}
						<ButtonGroup variant="outlined" aria-label="outlined primary button group">
							<Button
								sx={{
									color: theme.palette.text.primary, // Dynamically use the theme's text color
									backgroundColor: view === "meeting" ? theme.palette.primary.main : theme.palette.background.paper,
									"&:hover": {
										backgroundColor: view === "meeting" ? theme.palette.primary.light : theme.palette.action.hover,
									},
								}}
								onClick={() => handleViewChange("calendar")}
							>
								Show Calendar
							</Button>

							<Button
								sx={{
									color: theme.palette.text.primary,
									backgroundColor: view === "calendar" ? theme.palette.primary.main : theme.palette.background.paper,
									"&:hover": {
										backgroundColor: view === "calendar" ? theme.palette.primary.light : theme.palette.action.hover,
									},
								}}
								onClick={() => handleViewChange("meeting")}
							>
								Show Meetings
							</Button>
						</ButtonGroup>

						<Tooltip title="More information" arrow>
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
						{view === "calendar" ? <MiniCalendar /> : <MeetingsList />}
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
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, ml: 2, mt: 2, mr: 2 }}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
								List of posts
							</Typography>
							<Typography variant="body2" sx={{ color: "#555", marginBottom: 1.3, ml: 1 }}>
								Click on a post to view details
							</Typography>
						</Box>

						<Tooltip title="More information" arrow>
							<IconButton
								sx={{
									alignItems: "right",
								}}
								aria-label="info"
							>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</Box>
					<Box sx={{ display: "flex", gap: 2 }}>
						<MiniPostList posts={posts} isLoading={isLoading} isError={isError} refetch={refetch} />
					</Box>
					<Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}>
						<CustomButton variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							View all
						</CustomButton>
						<CustomButton variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							Create a post
						</CustomButton>
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
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, ml: 2, mt: 2, mr: 2 }}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
								Your Active Collaborations
							</Typography>
							<Typography variant="body2" sx={{ color: "#555", marginBottom: 1.3, ml: 1 }}>
								Click to view collaboration page
							</Typography>
						</Box>

						<Tooltip title="More information" arrow>
							<IconButton
								sx={{
									alignItems: "right",
								}}
								aria-label="info"
							>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</Box>
					<Box sx={{ display: "flex", gap: 2 }}>
						<MiniCollabList />
					</Box>
					<Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}>
						<CustomButton variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							View more
						</CustomButton>
					</Box>
				</Box>
			</MediumShortOnShortBoxLayout>
		</ThemeProvider>
	);
}
