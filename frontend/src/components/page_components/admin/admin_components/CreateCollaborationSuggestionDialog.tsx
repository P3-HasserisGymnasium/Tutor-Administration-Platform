import { Avatar, Box, Dialog, DialogContent, DialogTitle, Grid2, Paper, Theme, Typography, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { PostType } from "~/types/entity_types";
import { useRoleService } from "~/api/services/role-service";
import TutorCardForAdmin from "./TutorCardForAdmin";
import { tutorListFilterType } from "~/types/data_types";
import { useCollaborationService } from "~/api/services/collaboration-service";

type CreateCollaborationSuggestionDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  post: PostType;
};

const CreateCollaborationSuggestionDialog = ({ open, setOpen, post }: CreateCollaborationSuggestionDialogProps) => {
  const { data: tuteeProfile } = useRoleService().useGetTuteeProfile(post.tutee_id ?? 0);
  const submitSuggestionMutation = useCollaborationService().useSubmitCollaborationSuggestion();
  const emptyFilter: tutorListFilterType = {
    subjects: [],
    time_availability: [],
    year_group: [],
    languages: [],
  };
  const { data: listOfTutors } = useRoleService().useGetTutors(emptyFilter);
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme<Theme>();

  const chooseHandler = (id: number) => {
    submitSuggestionMutation.mutate(
      { tutee_id: post.tutee_id ?? 0, tutor_id: id, post_id: post.id, subject: post.subject },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      maxWidth={"md"}
      PaperProps={{
        sx: {
          height: "80vh",
          borderRadius: 4,
          paddingBottom: 0,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          backgroundColor: theme.palette.primary.main,
          width: "100%",
          height: "40px",
          color: "white  ",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <Typography variant="h2" sx={{ padding: 2 }}>
          Review collaboration
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}></Box>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", height: "calc(100% - 40px)", p: 0, pr: 2, pl: 2, pt: 0, justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "100%",
            p: 0,
            mr: 2,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              height: "55%",
              width: "100%",
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              pl: 1,
            }}
          >
            <Typography variant="h1" sx={{ alignSelf: "center", fontWeight: "bold" }}>
              Tutee
            </Typography>
            <Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
              <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
              <Typography variant="h5">{tuteeProfile?.full_name}</Typography>
            </Grid2>
            <Box sx={{ marginBottom: 2, gap: 3 }}>
              <Typography variant="body1">
                <strong>Year group:</strong> {tuteeProfile?.year_group}
              </Typography>
              <Typography variant="body1">
                <strong>Languages:</strong> {tuteeProfile?.languages.join(", ")}
              </Typography>
              <Typography variant="body1">
                <strong>Subjects receiving help in:</strong> {tuteeProfile?.subjects_receiving_help_in.join(", ")}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={4} sx={{ height: "40%", width: "100%" }}>
            <Typography variant="h1" sx={{ textAlign: "center", fontWeight: "bold" }}>
              Post
            </Typography>
            <Box sx={{ height: "80%", maxHeight: "80%", marginBottom: 2, gap: 3, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", pl: 1 }}>
              <Typography variant="body1">
                <strong>Post title:</strong> {post.title}
              </Typography>
              <Typography variant="body1">
                <strong>Subject:</strong> {post.subject}
              </Typography>
              <Typography variant="body1">
                <strong>Description</strong> {post.description}
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            width: "50%",
            p: 1,
            height: "95%",
          }}
        >
          {listOfTutors?.map((tutor) => (
            <TutorCardForAdmin key={tutor.id} profile={tutor} chooseHandler={chooseHandler} />
          ))}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollaborationSuggestionDialog;
