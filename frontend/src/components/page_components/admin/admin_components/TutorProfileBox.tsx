import { Paper, Box, Typography } from "@mui/material";
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { TutorProfileType } from "~/types/entity_types";
import ManageTutorDialog from "./ManageTutorDialog";
import React from "react";

type TutorProfileBoxProps = {
  tutor: TutorProfileType;
};

export function TutorProfileBox({ tutor }: TutorProfileBoxProps) {
  const [manageDialog, setManageDialog] = React.useState(false);

  return (
    <>
      <ManageTutorDialog open={manageDialog} setOpen={setManageDialog} tutorProfile={tutor} />
      <Paper
        onClick={() => setManageDialog(true)}
        elevation={8}
        sx={{
          width: 2 / 7,
          height: "75%",
          border: "2px solid black",
          borderRadius: "0.75em",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box sx={{ height: "50%", width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Box sx={{ width: "25%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <InitialsAvatar fullName={tutor.full_name} sx={{ height: "4em", width: "4em" }} />
          </Box>
          <Box sx={{ width: "25%", height: "50%" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              <b>{tutor.full_name}</b>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: "50%", width: "100%", overflowY: "scroll" }}>
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%", overflowY: "hidden", maxWidth: "100%", overflowX: "hidden" }}>
            Teaches in {tutor.tutoring_subjects.map((subject) => subject).join(", ")}
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Year: {tutor.year_group}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Speaks: {tutor.languages.map((language) => language).join(", ")}
          </Typography>
        </Box>
      </Paper>
    </>
  );
}
