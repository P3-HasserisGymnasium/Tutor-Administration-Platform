import { Avatar, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useRoleService } from "~/api/services/role-service";
import CustomButton from "~/components/content_components/CustomButton";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { CollaborationState } from "~/types/data_types";
import { useRolePrefix } from "~/utilities/helperFunctions";

type InvitationUpdateFromAdministratorDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  context_id: number | null;
};

const InvitationUpdateFromAdministratorDialog = ({ open, setOpen, context_id }: InvitationUpdateFromAdministratorDialogProps) => {
  const { data: collaboration, isLoading } = useCollaborationService().useGetCollaborationById(context_id);
  const { acceptCollaboration, rejectCollaboration } = useCollaborationService();
  const { data: tutorProfile } = useRoleService().useGetTutorProfile(collaboration?.tutorId ?? 0);
  const handleClose = () => {
    setOpen(false);
  };

  const rolePrefix = useRolePrefix();

  const handleAccept = () => {
    acceptCollaboration.mutate({ collaboration_id: context_id || 0, role: rolePrefix == "/tutor" ? "Tutor" : "Tutee" });
    setOpen(false);
  };

  const handleReject = () => {
    rejectCollaboration.mutate({ collaboration_id: context_id || 0, role: rolePrefix == "/tutor" ? "Tutor" : "Tutee" });
    setOpen(false);
  };

  if (isLoading) return <CircularProgress />;
  console.log("collaboration", collaboration);
  if (collaboration?.state === CollaborationState.Enum.WAITING_FOR_BOTH) {
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
          Collaboration Suggestion
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="body1">
            You have received a collaboration suggestion from an administrator to collaborate with tutor {collaboration?.tutorName} in {collaboration?.subject}
          </Typography>
          <Box sx={{ width: "100%", padding: 2, mt: 2 }}>
            {/* Picture and Name Row */}
            <Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
              <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
              <Typography variant="h5">{tutorProfile?.full_name}</Typography>
            </Grid2>

            {/* Info Row */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Year group:</strong> {tutorProfile?.year_group}
              </Typography>
              <Typography variant="body1">
                <strong>Languages:</strong> {tutorProfile?.languages.join(", ")}
              </Typography>
              <Typography variant="body1">
                <strong>Subjects:</strong> {tutorProfile?.tutoring_subjects.join(", ")}
              </Typography>
            </Box>

            {/* Time Availability Row */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Time Availability:
              </Typography>
              <Grid2 container spacing={2}>
                {tutorProfile?.time_availability.map((availability) => (
                  <TimeAvailabilityBox timeAvailability={availability} />
                ))}
              </Grid2>
            </Box>

            {/* Description Row */}
            <Box>
              <Typography variant="body1">{tutorProfile?.description}</Typography>
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
          <CustomButton sx={{ width: "10em" }} customType="warning" onClick={handleReject}>
            Reject
          </CustomButton>
          <CustomButton sx={{ width: "10em" }} customType="success" onClick={handleAccept}>
            Accept
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  }

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
        {" "}
        An administrator has {collaboration?.state === CollaborationState.Enum.ESTABLISHED ? "accepted" : "rejected"} your invitation
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="body1">
          The administrator has {collaboration?.state === CollaborationState.Enum.ESTABLISHED ? "accepted" : "rejected"} your invitation to collaborate with{" "}
          {rolePrefix == "/tutor" ? collaboration?.tuteeName : collaboration?.tutorName} in {collaboration?.subject}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "2em",
        }}
      >
        <CustomButton sx={{ width: "10em" }} customType="success" onClick={handleClose}>
          Acknowledge
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationUpdateFromAdministratorDialog;
