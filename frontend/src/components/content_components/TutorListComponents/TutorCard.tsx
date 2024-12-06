import { ProfileType } from "~/types/entity_types";
import { Box, Button, Typography } from "@mui/material";
//import avatarDemo from "./avatarDemo.png";
import SubjectChip from "components/content_components/SubjectChip.tsx";
import { SubjectType } from "~/types/data_types";
import CustomButton from "../CustomButton";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import InitialsAvatar from "../InitialsAvatar";
import { useAuth } from "~/api/authentication/useAuth";

export default function TutorCard({ profile }: { profile: ProfileType }) {
  const theme = useTheme<Theme>();
  const { userState } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.customColors.collaborationBackgroundColor,
        border: "1px solid "+ theme.customColors.headingTextColor,
        padding: "1em",
        borderRadius: "0.5em",
      }}
    >
      <InitialsAvatar fullName={userState.name}/>
      <Box
        sx={{
          marginRight: "1em",
        }}
      >
        <Typography variant="h3">
          {profile.full_name}
        </Typography>
        <Typography variant="h4">
          {profile.year_group}
        </Typography>
        {profile.subjects.map((subject: SubjectType, id: number) => (
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
        <Button variant="contained" sx={{marginBottom:"0.5em"}}>
          View profile
        </Button>
        <CustomButton customType="success">
          Request collaboration
        </CustomButton>
      </Box>
    </Box>
  );
}
