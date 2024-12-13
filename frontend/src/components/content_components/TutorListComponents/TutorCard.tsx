import { TutorProfileType } from "~/types/entity_types";
import { Box, Button, Typography } from "@mui/material";
import SubjectChip from "components/content_components/SubjectChip.tsx";
import { SubjectType } from "~/types/data_types";
import CustomButton from "../CustomButton";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import TutorProfileDialog from "~/components/page_components/dialogs/ProfileDialog";
import { useAuth } from "~/api/authentication/useAuth";
import InitialsAvatar from "../InitialsAvatar";
import RequestTutorDialog from "~/components/page_components/dialogs/RequestTutorDialog";
import { useState } from "react";

export default function TutorCard({ profile }: { profile: TutorProfileType }) {
  const theme = useTheme<Theme>();
  const { userState } = useAuth();

  const [isTutorProfileDialogOpen, setIsTutorProfileDialogOpen] = useState(false);
  const [isRequestTutorDialogOpen, setIsRequestTutorDialogOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.customColors.collaborationBackgroundColor,
        border: "1px solid " + theme.customColors.headingTextColor,
        padding: "1em",
        borderRadius: "0.5em",
      }}
    >
      <RequestTutorDialog open={isRequestTutorDialogOpen} setOpen={setIsRequestTutorDialogOpen} tutorProfile={profile} />
      <InitialsAvatar fullName={userState.name} />
      <Box
        sx={{
          marginRight: "1em",
        }}
      >
        <Typography variant="h3">{profile.full_name}</Typography>
        <Typography variant="h4">{profile.year_group}</Typography>
        {profile.tutoring_subjects.map((subject: SubjectType, id: number) => (
          <SubjectChip key={id} Subject={subject} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" sx={{ marginBottom: "0.5em" }} onClick={() => setIsTutorProfileDialogOpen(true)}>
          View profile
        </Button>
        <TutorProfileDialog open={isTutorProfileDialogOpen} setOpen={setIsTutorProfileDialogOpen} tutorProfile={profile} />
        <CustomButton onClick={() => setIsRequestTutorDialogOpen(true)} customType="success">
          Request collaboration
        </CustomButton>
      </Box>
    </Box>
  );
}
