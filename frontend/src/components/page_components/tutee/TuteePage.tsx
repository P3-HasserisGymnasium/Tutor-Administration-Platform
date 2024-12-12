import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { useState } from "react";
import { Box, Button, Typography, ButtonGroup, IconButton, Tooltip, ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
// import tutorTheme from "~/themes/tutorTheme";
import MiniCollabList from "src/components/content_components/MiniCollabList";
import MiniPostList from "src/components/content_components/MiniPostList";
import MiniCalendar from "src/components/content_components/MiniCalendar";
import MeetingsList from "src/components/content_components/MeetingsList";
//import { useNavigate } from "react-router-dom";
import { useCurrentTheme, useBreakpoints } from "~/utilities/helperFunctions";
import CustomButton from "~/components/content_components/CustomButton";
import { usePostService } from "~/api/services/post-service";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useAuth } from "~/api/authentication/useAuth";
import ViewCollaborationsDialog from "src/components/page_components/dialogs/ViewCollaborationsDialog";
import EditPostDialog from "../dialogs/EditPostDialog";
import { PostState, Subject } from "~/types/data_types";
import { PostType } from "~/types/entity_types";
import ViewPostsDialog from "../dialogs/ViewPostsDialog";
import CreateCollaborationDialog from "../dialogs/CreateCollaborationDialog";
import { useNavigate } from "react-router-dom";
import { useMeetingService } from "~/api/services/meeting-service";

const post: PostType = {
	id: 1,
	title: "hjælp mig",
	description: "iosjdsiaojdaojdasdiasdjsaod jsadj iasojdasd",
	subject: Subject.Enum.Danish,
	duration: [2, 8],
	state: PostState.Enum.VISIBLE,
};
export default function TuteePage() {
	const navigate = useNavigate();
	const { useGetTuteePosts } = usePostService();
	const { useGetCollaborationsWithTutee } = useCollaborationService();
	const theme = useCurrentTheme();
	const { isMobile } = useBreakpoints();
	const [view, setView] = useState<"list" | "calender">("calender");
	const [showCollabDialog, setShowCollabDialog] = useState(false);
	const [showPostDialog, setShowPostDialog] = useState(false);
	const [showEditPostDialog, setShowEditPostDialog] = useState(false);
	const [showCreateCollabDialog, setshowCreateCollabDialog] = useState(false);
	const { userState } = useAuth();
	const { data: posts, isLoading: postsLoading, isError: postsError } = useGetTuteePosts();
	const { data: collaborations, isLoading: collabLoading, isError: collabError } = useGetCollaborationsWithTutee(userState?.id || null);
	const { data: meetings } = useMeetingService().useGetMeetings();

	meetings?.filter((meeting) => {
		return meeting.tutee_user_id === userState.id;
	});

	return (
		<ThemeProvider theme={theme}>
			<CreateCollaborationDialog open={showCreateCollabDialog} setOpen={setshowCreateCollabDialog} />
			<ViewCollaborationsDialog
				open={showCollabDialog}
				setOpen={setShowCollabDialog}
				collaborations={collaborations}
				isLoading={collabLoading}
			/>
			<EditPostDialog open={showEditPostDialog} setOpen={setShowEditPostDialog} post={post} />
			<ViewPostsDialog open={showPostDialog} setOpen={setShowPostDialog} posts={posts} isLoading={postsLoading} />
			<MediumShortOnShortBoxLayout>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: "1px solid #white",
						borderRadius: "8px",
						overflow: "hidden",
						height: "95%",
						p: isMobile ? 1 : 2,
						position: "relative",
					}}
				>
					{/* Header with Title and Buttons */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							gap: isMobile ? 2 : 17,
							width: "100%",
							height: "5%",
							minHeight: "40px",
						}}
					>
						<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1, width: 1 / 3 }}>
							{view === "calender" ? "Calendar" : "Meeting List"}{" "}
						</Typography>

						{/* Button group for toggling between calendar and meeting */}
						<ButtonGroup sx={{ width: 1.2 / 3, minWidth: "267px" }} variant="outlined" aria-label="outlined primary button group">
							<Button
								sx={{
									width: "160px",
									color: theme.palette.text.primary, // Dynamically use the theme's text color
									backgroundColor: view === "calender" ? theme.palette.primary.main : theme.palette.background.paper,
								}}
								onClick={() => setView("calender")}
							>
								Show Calendar
							</Button>

							<Button
								sx={{
									width: "160px",

									color: theme.palette.text.primary,
									backgroundColor: view === "list" ? theme.palette.primary.main : theme.palette.background.paper,
								}}
								onClick={() => setView("list")}
							>
								Show Meetings
							</Button>
						</ButtonGroup>
						<Box sx={{ width: 1 / 3 }}>
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
					</Box>
					<Box
						sx={{
							height: "100%",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							alignItems: "flex-end",
							border: "white 1px",
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
						minHeight: "310px",
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, ml: 2, mt: 2, mr: 2 }}>
						<Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
								Your active posts
							</Typography>
							<Typography variant="body2" sx={{ color: "#555", marginBottom: 1.3, ml: 1 }}>
								Click on a post to view details
							</Typography>
						</Box>

						<Tooltip
							title="Posts are visible to tutors. Tutors can request to help you, in which case you can accept their help. You can create a new post, or edit and delete an existing post."
							arrow
						>
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
						<MiniPostList posts={posts} isLoading={postsLoading} isError={postsError} />
					</Box>
					<Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}>
						<CustomButton onClick={() => setShowPostDialog(true)} variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							View all
						</CustomButton>
						<CustomButton onClick={() => navigate("/tutee/create-post")} variant="contained" color="primary" sx={{ fontSize: "18px" }}>
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

						<Tooltip
							title="Each collaboration with a tutor has a specific collaboration page. To view this page, simply click on one of the collaborations. When creating a collaboration, you can either find a tutor and request a collaboration with them, create a post which tutors can see, or request help from the administrator to find a fitting tutor."
							arrow
						>
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
						<MiniCollabList collaborations={collaborations} isLoading={collabLoading} isError={collabError} />
					</Box>
					<Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}>
						<CustomButton onClick={() => setshowCreateCollabDialog(true)} variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							Create Collaboration
						</CustomButton>
						<CustomButton onClick={() => setShowCollabDialog(true)} variant="contained" color="primary" sx={{ fontSize: "18px" }}>
							View more
						</CustomButton>
					</Box>
				</Box>
			</MediumShortOnShortBoxLayout>
		</ThemeProvider>
	);
}
