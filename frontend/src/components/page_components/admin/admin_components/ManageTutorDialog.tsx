import { Autocomplete, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid2, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useState } from "react";
import { TutorProfileType } from "~/types/entity_types";
import TimeAvailabilityBox from "~/components/content_components/TimeAvailabilityBox";
import { useRoleService } from "~/api/services/role-service";
import { Subject, SubjectType } from "~/types/data_types";

type ManageTutorDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tutorProfile: TutorProfileType;
};

const ManageTutorDialog = ({ open, setOpen, tutorProfile }: ManageTutorDialogProps) => {
  const { useAddSubject, useRemoveSubject } = useRoleService();
  const addSubjectMutation = useAddSubject("tutor");
  const removeSubjectMutation = useRemoveSubject("tutor");
  const tutorId = tutorProfile.id;
  const handleClose = () => {
    setOpen(false);
  };

  const [subject, setSubject] = useState<SubjectType | null>(null);
  const [showSubjectChooser, setShowSubjectChooser] = useState(false);

  const handleAddSubject = () => {
    if (subject) {
      addSubjectMutation.mutate({ tutee_tutorId: tutorId, subject: subject });
    }
  };

  const handleRemoveSubject = () => {
    if (subject) {
      removeSubjectMutation.mutate({ tutee_tutorId: tutorId, subject: subject });
    }
  };
  console.log("subject", subject);
  return (
    <Dialog
      open={open}
      onClose={handleClose} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
      scroll="paper"
      fullWidth
      maxWidth="md"
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
          Tutor Profile
        </Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ marginLeft: "auto" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", paddingBottom: 0 }}>
        <Box sx={{ width: 1 / 3, paddingTop: 4, flexDirection: "column", display: "flex", gap: 4, alignItems: "flex-start" }}>
          <Button onClick={() => setShowSubjectChooser((prev) => !prev)} sx={{ height: "50px", fontSize: 18 }} variant="contained" color="primary">
            Manage subject
          </Button>{" "}
          {showSubjectChooser && (
            <Autocomplete
              disablePortal
              fullWidth
              value={subject}
              onChange={(_, newValue: SubjectType | null) => setSubject(newValue)}
              options={Object.values(Subject.enum)}
              renderInput={(params) => <TextField {...params} label="Select subject" />}
            />
          )}
          {subject && tutorProfile?.tutoring_subjects?.includes(subject) && showSubjectChooser && (
            <Button onClick={handleRemoveSubject} sx={{ height: "40px", fontSize: 18, backgroundColor: "darkred" }} variant="contained" color="primary">
              Remove subject
            </Button>
          )}
          {subject && !tutorProfile?.tutoring_subjects?.includes(subject) && showSubjectChooser && (
            <Button onClick={handleAddSubject} sx={{ height: "50px", fontSize: 18, backgroundColor: "green" }} variant="contained" color="primary">
              Add subject
            </Button>
          )}
          <Button sx={{ height: "50px", fontSize: 18, backgroundColor: "red" }} variant="contained">
            Remove account
          </Button>
        </Box>
        <Box sx={{ width: 2 / 3, padding: 2 }}>
          {" "}
          {/* Picture and Name Row */}
          <Grid2 container spacing={2} alignItems="center" justifyContent="start" sx={{ marginBottom: 2 }}>
            <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
            <Typography variant="h5">{tutorProfile.full_name}</Typography>
          </Grid2>
          {/* Info Row */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              <strong>Year group:</strong> {tutorProfile.year_group}
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
              {tutorProfile.time_availability.map((availability, i) => (
                <TimeAvailabilityBox key={"ijdad " + i} timeAvailability={availability} />
              ))}
            </Grid2>
          </Box>
          {/* Description Row */}
          <Box>
            <Typography variant="body1">{tutorProfile.description}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManageTutorDialog;
