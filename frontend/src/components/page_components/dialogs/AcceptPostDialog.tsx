import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PostType, RequestCollaborationByPostType } from "~/types/entity_types";
import CustomButton from "~/components/content_components/CustomButton";
import { useAuth } from "~/api/authentication/useAuth";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useNavigate } from "react-router-dom";

type AcceptPostDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
};

export default function AcceptPostDialog({ open, setOpen, post }: AcceptPostDialogProps) {
  const navigate = useNavigate();
  const requestCollaborationMutation = useCollaborationService().useRequestCollaborationViaPost();
  const { userState } = useAuth();

  const handleRequestCollaboration = () => {
    const body: RequestCollaborationByPostType = {
      post_id: post.id,
      tutor_id: userState?.id || 0,
    };
    requestCollaborationMutation.mutate(body, {
      onSuccess: () => {
        handleClose();
        setTimeout(() => {
          navigate("/tutor");
        }, 1000);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h2">{post.title}</Typography>
        <IconButton onClick={handleClose} sx={{ marginLeft: "auto" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
        <Box sx={{ width: "100%", padding: 2 }}>
          {/* Info Row */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong> Needs help in: </strong> {post.subject}
            </Typography>{" "}
            <Typography variant="body1">
              <strong>Expected duration: </strong> {post.duration} months
            </Typography>
            <Typography variant="body1">
              <strong>Description of problem: </strong> {post.description} {post.description} {post.description} {post.description} {post.description} {post.description} {post.description}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleRequestCollaboration} color="primary">
          Accept
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
