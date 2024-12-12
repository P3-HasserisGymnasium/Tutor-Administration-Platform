import { Avatar, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from "@mui/material";
import { SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { Role } from "~/types/data_types";
import { useRoleService } from "~/api/services/role-service";

type AcceptInviteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  collaboration_id: number | null;
  tutee_id: number | null;
};

export default function AcceptInvitationFromTuteeDialog({ open, setOpen, collaboration_id, tutee_id }: AcceptInviteDialogProps) {
  const { acceptCollaboration, rejectCollaboration } = useCollaborationService();
  const { data: collaboration, isLoading: isCollaborationLoading } = useCollaborationService().useGetCollaborationById(collaboration_id);
  const { data: tuteeProfile, isLoading: isTuteeProfileLoading } = useRoleService().useGetTuteeProfile(tutee_id);
  console.log("tuteeProfile", tuteeProfile);
  console.log("tuteeid", tutee_id);
  console.log("collaboration", collaboration);
  console.log("collaboration_id", collaboration_id);
  const acceptCollab = () => {
    if (collaboration?.id) {
      acceptCollaboration.mutate(
        { id: collaboration.id, role: Role.Enum.Tutor },
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
    if (collaboration?.id) {
      rejectCollaboration.mutate(
        { id: collaboration.id, role: Role.Enum.Tutor },
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

  if (isCollaborationLoading || isTuteeProfileLoading) return <CircularProgress />;

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
        {tuteeProfile?.full_name} has sent an invite to collaborate
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
          <Typography variant="h4">
            <b>Wants help in:</b> {collaboration?.subject}
          </Typography>
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
            <Typography variant="h5">{tuteeProfile?.full_name}</Typography>
          </Grid2>

          {/* Info Row */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>Year group:</strong> {tuteeProfile?.year_group}
            </Typography>
            <Typography variant="body1">
              <strong>Languages:</strong> {tuteeProfile?.languages.join(", ")}
            </Typography>
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
        <CustomButton sx={{ width: "10em" }} customType="warning" onClick={rejectCollab}>
          Reject
        </CustomButton>

        <CustomButton sx={{ width: "10em" }} customType="success" onClick={acceptCollab}>
          Accept
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
