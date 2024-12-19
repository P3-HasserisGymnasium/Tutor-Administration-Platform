import { /* Autocomplete */ Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction /* useState */ } from "react";
import { TuteeProfileType } from "~/types/entity_types";
/* import { useRoleService } from "~/api/services/role-service";
import { Subject, SubjectType } from "~/types/data_types";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
 */
type ManageTuteeDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tuteeProfile: TuteeProfileType;
};

const ManageTuteeDialog = ({ open, setOpen, tuteeProfile }: ManageTuteeDialogProps) => {
  /*   const { useAddSubject, useRemoveSubject } = useRoleService();
   */ /*  const addSubjectMutation = useAddSubject("tutee");
  const removeSubjectMutation = useRemoveSubject("tutee");
  const tuteeId = tuteeProfile.id; */
  const handleClose = () => {
    setOpen(false);
  };
  /* 
  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [showSubjectChooser, setShowSubjectChooser] = useState(false);

  const handleAddSubject = () => {
    if (subject) {
      addSubjectMutation.mutate({ tutee_tutorId: tuteeId, subject: subject });
    }
  };

  const handleRemoveSubject = () => {
    if (subject) {
      removeSubjectMutation.mutate({ tutee_tutorId: tuteeId, subject: subject });
    }
  }; */

  return (
    <Dialog
      open={open}
      onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          paddingBottom: 1,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 0 }}>
        <Typography variant="h2" p={0}>
          Tutee Profile
        </Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ marginLeft: "auto" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
        <Box sx={{ width: 1 / 2, paddingTop: 4, flexDirection: "column", display: "flex", gap: 4, alignItems: "flex-start" }}>
          <Button sx={{ height: "50px", fontSize: 18, backgroundColor: "red" }} variant="contained">
            Remove account
          </Button>
        </Box>
        <Box sx={{ width: 2 / 3, padding: 2 }}>
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
            <Typography variant="body1">
              <strong>Contact info:</strong> {tuteeProfile?.contact_info.join(", ")}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTuteeDialog;
