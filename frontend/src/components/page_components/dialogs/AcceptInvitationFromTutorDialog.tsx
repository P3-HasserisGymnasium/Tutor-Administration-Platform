import { Avatar, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from "@mui/material";
import { SetStateAction } from "react";
import CustomButton from "~/components/content_components/CustomButton";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { NotificationContext, NotificationContextType, Role } from "~/types/data_types";
import { useRoleService } from "~/api/services/role-service";
import { usePostService } from "~/api/services/post-service";
type AcceptInviteDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  context_id: number | null;
  context_type: NotificationContextType | null;
  tutor_id: number | null;
};

export default function AcceptInvitationFromTutorDialog({ open, setOpen, context_id, context_type, tutor_id }: AcceptInviteDialogProps) {
  const { acceptCollaboration, rejectCollaboration, acceptCollaborationByPost } = useCollaborationService();
  const { data: collaboration, isLoading: isCollaborationLoading } = useCollaborationService().useGetCollaborationById(context_id);
  const { data: post, isLoading: isPostLoading } = usePostService().useGetPostById(context_id);
  const { data: tutorProfile, isLoading: isTutorProfileLoading } = useRoleService().useGetTutorProfile(tutor_id || 0);

  const acceptCollab = () => {
    if (context_type === NotificationContext.Enum.COLLABORATION && collaboration?.id) {
      acceptCollaboration.mutate(
        { collaboration_id: collaboration.id, role: Role.Enum.Tutee },
        {
          onSuccess: () => {
            setOpen(false);
          },
          onError: (error) => {
            console.error("Error accepting collaboration:", error);
          },
        }
      );
    } else if (context_type === NotificationContext.Enum.POST && post?.id) {
      acceptCollaborationByPost.mutate(
        { postId: context_id, tutorId: tutor_id },
        {
          onSuccess: () => {
            setOpen(false);
          },
          onError: (error) => {
            console.error("Error accepting collaboration by post:", error);
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
        { collaboration_id: collaboration.id, role: Role.Enum.Tutee },
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
      {isCollaborationLoading || isTutorProfileLoading || isPostLoading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {tutorProfile?.full_name} has sent an invitation to collaborate
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
                {tutorProfile?.full_name} can help you with {collaboration?.subject || post?.subject}
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
                <Typography variant="h5">{tutorProfile?.full_name}</Typography>
              </Grid2>

              {/* Info Row */}
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Year group:</strong> {tutorProfile?.year_group}
                </Typography>
                <Typography variant="body1">
                  <strong>Languages spoken:</strong> {tutorProfile?.languages?.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Subjects teaching in:</strong> {tutorProfile?.tutoring_subjects?.join(", ")}
                </Typography>
              </Box>

              {/* Time Availability Row */}
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Time Availability:
                </Typography>
                <Grid2 container spacing={2}>
                  {tutorProfile?.time_availability?.map((availability: any) => (
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
            <CustomButton sx={{ width: "10em" }} customType="warning" onClick={rejectCollab}>
              Reject
            </CustomButton>

            <CustomButton sx={{ width: "10em" }} customType="success" onClick={acceptCollab}>
              Accept
            </CustomButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
