import MediumShortOnShortBoxLayout from "components/layout_components/MediumShortOnShortBoxLayout";
import RequestMeetingDialog from "./dialogs/RequestMeetingDialog";
import { useState } from "react";
import EndCollaborationDialog from "./dialogs/EndCollaborationDialog";
import { useBreakpoints, useCurrentTheme, useRolePrefix } from "~/utilities/helperFunctions";
import { ThemeProvider } from "@emotion/react";
//import ViewCollaborationsDialog from "./dialogs/ViewCollaborationsDialog";
import { Box, Button, ButtonGroup, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import MiniCalendar from "../content_components/MiniCalendar";
import MeetingsList from "../content_components/MeetingsList";
import InfoIcon from "@mui/icons-material/Info";
import { useParams } from "react-router-dom";
import { useAuth } from "~/api/authentication/useAuth";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useMeetingService } from "~/api/services/meeting-service";
import { MeetingType } from "~/types/entity_types";
import CustomButton from "../content_components/CustomButton";
import CommunicationChip from "../content_components/CommunicationChip";

export default function CollaborationPage() {
  const theme = useCurrentTheme();
  const [isRequestMeetingDialogOpen, setIsRequestMeetingDialogOpen] = useState(false);
  const [isEndCollaborationDialogOpen, setIsEndCollaborationDialogOpen] = useState(false);
  const [view, setView] = useState<"list" | "calender">("list");
  const { isMobile } = useBreakpoints();
  const params = useParams();
  const { userState } = useAuth();
  const rolePrefix = useRolePrefix();
  console.log("params", params);
  console.log("userState", userState);

  const { data: partnerInformation } = useCollaborationService().useGetPartnerInformation(Number(params.org_id));
  console.log("partnerInformation", partnerInformation);
  const { data: meetings } = useMeetingService().useGetMeetings();
  /*   const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " | " + date.toLocaleDateString("en-GB");
  }; */
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(Date.parse(timestamp));
    console.log("date", date);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " | " + date.toLocaleDateString("en-GB");
  };
  // Categorize meetings into "Upcoming" and "Finished"
  const upcomingMeetings = meetings?.filter((meeting) => new Date(formatTimestamp(meeting.start_timestamp)) > new Date());
  const finishedMeetings = meetings?.filter((meeting) => new Date(formatTimestamp(meeting.end_timestamp)) < new Date());

  return (
    <ThemeProvider theme={theme}>
      {rolePrefix == "/tutee" && partnerInformation && (
        <RequestMeetingDialog
          open={isRequestMeetingDialogOpen}
          setOpen={setIsRequestMeetingDialogOpen}
          timeAvailabilities={partnerInformation.time_availability}
        />
      )}
      <EndCollaborationDialog open={isEndCollaborationDialogOpen} setOpen={setIsEndCollaborationDialogOpen} />
      <RequestMeetingDialog
        open={isRequestMeetingDialogOpen}
        setOpen={setIsRequestMeetingDialogOpen}
        timeAvailabilities={partnerInformation?.time_availability || []}
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
            {" "}
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
                    color: "black",
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
                    color: "black",
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
              justifyContent: "center",
              alignItems: "flex-end",
              border: "white 1px",
            }}
          >
            {view === "calender" ? <MiniCalendar meetings={meetings as MeetingType[]} /> : <MeetingsList />}
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
              <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Communication
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", marginBottom: 1.3, ml: 1 }}>
                Choose one of the following options to communicate with your partner.
              </Typography>
            </Box>

            <CustomButton sx={{ fontSize: "1rem" }} customType="warning" onClick={() => setIsEndCollaborationDialogOpen(true)}>
              End collaboration
            </CustomButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column", alignItems: "flex-start", ml: 2 }}>
            {partnerInformation?.contact_info?.map((contact) => {
              console.log("contact", contact);
              return <CommunicationChip contactInfo={{ username: contact.username, communication_medium: contact.communication_medium }} />;
            })}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}></Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #white",
            borderRadius: "8px",
            height: "100%",
            minHeight: "310px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, ml: 2, mt: 2, mr: 2, height: "10%", minHeight: "10%" }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Meetings
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", marginBottom: 1.3, ml: 1 }}>
                This box showcases both your upcoming and finished meetings.
              </Typography>
            </Box>

            <Button sx={{ fontSize: "1rem", height: "40px" }} onClick={() => setIsRequestMeetingDialogOpen(true)}>
              Request meeting
            </Button>
          </Box>
          <Box sx={{ display: "flex", width: "100%", gap: 3, height: "90%", maxHeight: "60%", justifyContent: "center", pt: 2 }}>
            <Paper elevation={8} sx={{ width: "40%", height: "100%", p: 2, borderRadius: "8px", overflow: "auto" }}>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 1 }}>
                Upcoming Meetings
              </Typography>
              {upcomingMeetings?.map((meeting) => (
                <Paper elevation={4} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1, mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {formatTimestamp(meeting.start_timestamp)}
                  </Typography>
                  <Typography variant="body2">{meeting.meeting_description}</Typography>
                </Paper>
              ))}
            </Paper>
            <Paper elevation={8} sx={{ width: "40%", height: "100%", p: 2, borderRadius: "8px" }}>
              <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 1 }}>
                Finished Meetings
              </Typography>
              {finishedMeetings?.map((meeting) => (
                <Paper elevation={4} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1, mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {formatTimestamp(meeting.start_timestamp)}
                  </Typography>
                  <Typography variant="body2">{meeting.meeting_description}</Typography>
                </Paper>
              ))}
            </Paper>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2, mr: 2, justifyContent: "end" }}></Box>
      </MediumShortOnShortBoxLayout>
    </ThemeProvider>
  );
}
