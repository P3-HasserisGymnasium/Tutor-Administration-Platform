import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from "@mui/material";
import { SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";
import { zodCollaborationSchema, tutorProfileSchema } from "~/types/entity_types";
import { z } from "zod";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { Role } from "~/types/data_types";


type Collaboration = z.infer<typeof zodCollaborationSchema>;
type TutorProfile = z.infer<typeof tutorProfileSchema>;

type AcceptInviteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  collaboration: Collaboration;
  tutorProfile: TutorProfile;
};

export default function AcceptInvitationFromTutorDialog({ open, setOpen, collaboration, tutorProfile }: AcceptInviteDialogProps) {
  const { acceptCollaboration } = useCollaborationService();
  const {rejectCollaboration} = useCollaborationService();

  const acceptCollab = () => {
    if (collaboration.id) {
    
      acceptCollaboration.mutate(
        { id: collaboration.id, role: Role.Enum.Tutee },
        {
          onSuccess: () => {
            setOpen(false);
          },
          onError: (error) => {
            console.error("Error accepting collaboration:", error);
          },
        }
      );
    } else {
      console.error("Collaboration ID not found");
    }
  };

  const rejectCollab = () => {
    if (collaboration.id) {
    
      rejectCollaboration.mutate(
        { id: collaboration.id, role: Role.Enum.Tutee },
        {
          onSuccess: () => {
            setOpen(false);
          },
          onError: (error) => {
            console.error("Error accepting collaboration:", error);
          },
        }
      );
    } else {
      console.error("Collaboration ID not found");
    }

  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {tutorProfile.full_name} has sent an invite
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Box
          sx={{
            width: "30em",
            padding: 2,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4">Receving help in: {collaboration.subject}</Typography>
        </Box>

        <Box
          sx={{
            width: "30em",
            padding: 2,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: 2,
          }}
        >
          {/* Picture and Name Row */}
          <Grid2 container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
            <Typography variant="h5">{tutorProfile.full_name}</Typography>
          </Grid2>

          {/* Info Row */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>Year group:</strong> {tutorProfile.yearGroup}
            </Typography>
            <Typography variant="body1">
              <strong>Languages:</strong> {tutorProfile.languages.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Subjects:</strong> {tutorProfile.tutoring_subjects.join(", ")}
            </Typography>
          </Box>

          {/* Time Availability Row */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Time Availability:
            </Typography>
            <Grid2 container spacing={2}>
              {tutorProfile.time_availability.map((availability) => (
                <TimeAvailabilityBox timeAvailability={availability} />
              ))}
            </Grid2>
          </Box>

          {/* Description Row */}
          <Box>
            <Typography variant="body1">{tutorProfile.description}</Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "2em",
        }}
      >
        <CustomButton sx={{ width: "10em" }} customType="warning"
        onClick={rejectCollab}
        >
          Reject
        </CustomButton>

        <CustomButton sx={{ width: "10em" }} customType="success" onClick={acceptCollab}>
          Accept
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
