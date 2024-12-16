import { Paper, Box, Typography } from "@mui/material";
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { TutorProfileType } from "~/types/entity_types";

type TutorProfileBoxProps = {
  tutor: TutorProfileType;
};

export function TutorProfileBox({ tutor }: TutorProfileBoxProps) {
  return (
    <Paper elevation={8} sx={{ width: 2 / 7, height: "75%", border: "2px solid black", borderRadius: "0.75em" }}>
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
      <Box sx={{ height: "50%", width: "100%" }}>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
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
  );
}
