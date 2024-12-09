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

export default function HomePage() {
	const [view, setView] = React.useState("meeting");
	const theme = useCurrentTheme();
	const { isMobile } = useBreakpoints();

	const handleViewChange = (newView: React.SetStateAction<string>) => {
		setView(newView);
	};

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
						overflow: "hidden",
						p: 2,
						position: "relative",
					}}
				>
					{/* Page Title */}
					<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
						List of posts
					</Typography>
					<Typography variant="body2" sx={{ color: "#555", marginBottom: 4 }}>
						Click on a post to view details
					</Typography>

					{/* info icon */}
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

					<MiniPostList />

					{/* View More Button */}
					<Button
						variant="contained"
						color="primary"
						sx={{
							marginTop: 4,
							position: "relative",
							alignItems: "right",
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
							padding: "10px 20px",
							fontSize: "16px",
							backgroundColor: theme.palette.primary.main, // Use primary color from the theme
							color: theme.palette.getContrastText(theme.palette.primary.main),
							"&:hover": {
								backgroundColor: theme.palette.primary.dark,
							},
						}}
						//onClick={() => navigate("")}
					>
						View more
					</Button>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "1px solid #white",
						borderRadius: "8px",
						overflow: "hidden",
						p: 2,
						position: "relative",
					}}
				>
					<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
						Your Active Collaborations
					</Typography>
					<Typography variant="body2" sx={{ color: "#555", marginBottom: 4 }}>
						Click to view collaboration page
					</Typography>

					{/* info icon */}
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

					<MiniCollabList />

					{/* View More Button */}
					<Button
						variant="contained"
						color="primary"
						sx={{
							marginTop: 4,
							position: "relative",
							alignItems: "right",
							display: "block",
							marginLeft: "auto",
							marginRight: "auto",
							padding: "10px 20px",
							fontSize: "16px",
							backgroundColor: theme.palette.primary.main, // Use primary color from the theme
							color: theme.palette.getContrastText(theme.palette.primary.main),
							"&:hover": {
								backgroundColor: theme.palette.primary.dark,
							},
						}}
						//onClick={() => navigate("")}
					>
						View more
					</Button>
				</Box>
			</MediumShortOnShortBoxLayout>
		</ThemeProvider>
	);
}
