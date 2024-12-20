import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import { useState } from "react";
import { Box, Button, Typography, ButtonGroup, IconButton, Tooltip, ThemeProvider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MiniCollabList from "src/components/content_components/MiniCollabList";
import MiniPostList from "src/components/content_components/MiniPostList";
import MiniCalendar from "src/components/content_components/MiniCalendar";
import MeetingsList from "src/components/content_components/MeetingsList";
import { useCurrentTheme, useBreakpoints } from "~/utilities/helperFunctions";
import CustomButton from "~/components/content_components/CustomButton";
import { usePostService } from "~/api/services/post-service";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useAuth } from "~/api/authentication/useAuth";
import ViewCollaborationsDialog from "src/components/page_components/dialogs/ViewCollaborationsDialog";
import { useNavigate } from "react-router-dom";
import { MeetingType } from "~/types/entity_types";
import { useMeetingService } from "~/api/services/meeting-service";
import { CollaborationState } from "~/types/data_types";
import CreateCollaborationDialog from "../dialogs/CreateCollaborationDialog";
export default function TutorPage() {
  const navigate = useNavigate();
  const theme = useCurrentTheme();
  const { isMobile } = useBreakpoints();
  const [view, setView] = useState<"list" | "calender">("calender");
  const [showCollabDialog, setShowCollabDialog] = useState(false);

  const { userState } = useAuth();
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = usePostService().useGetPosts({ duration: [0, 12], subjects: userState?.tutoring_subjects || [] });
  const {
    data: collaborations,
    isLoading: collabLoading,
    isError: collabError,
  } = useCollaborationService().useGetCollaborationsWithTutor(userState?.id || null);
  const { data: meetings } = useMeetingService().useGetMeetings();

  const filteredCollaborations = collaborations?.filter((collab) => collab.state === CollaborationState.Enum.ESTABLISHED);

  return (
    <ThemeProvider theme={theme}>
      <CreateCollaborationDialog open={false} setOpen={() => { }} />
      <ViewCollaborationsDialog
        open={showCollabDialog}
        setOpen={setShowCollabDialog}
        collaborations={filteredCollaborations}
        isLoading={collabLoading}
      />

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
                  color: view === "calender" ? "white" : theme.palette.text.primary,
                  backgroundColor: view === "calender" ? theme.palette.primary.main : "white",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => setView("calender")}
              >
                Show Calendar
              </Button>

              <Button
                sx={{
                  width: "160px",
                  color: view === "list" ? "white" : theme.palette.text.primary,
                  backgroundColor: view === "list" ? theme.palette.primary.main : "white",
                  "&:hover": {
                    color: "white",
                  },
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
              maxHeight: "100%",
              maxWidth: "100%",
              justifyContent: "center",
              alignItems: "center",
              border: "white 1px",
            }}
          >
            {view === "calender" ? <MiniCalendar meetings={meetings as MeetingType[]} /> : <MeetingsList meetings={meetings as MeetingType[]} />}
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
            <CustomButton onClick={() => navigate("/tutor/posts-list")} variant="contained" color="primary" sx={{ fontSize: "18px" }}>
              View all
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
            <MiniCollabList collaborations={filteredCollaborations} isLoading={collabLoading} isError={collabError} />
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}>
            <CustomButton
              style={{ visibility: (filteredCollaborations?.length ?? 0) > 3 ? "visible" : "hidden" }}
              onClick={() => setShowCollabDialog(true)}
              variant="contained"
              color="primary"
              sx={{ fontSize: "18px" }}
            >
              View more
            </CustomButton>
          </Box>
        </Box>
      </MediumShortOnShortBoxLayout>
    </ThemeProvider>
  );
}
