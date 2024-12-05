import { ProfileType } from "~/types/entity_types";
import { Avatar, Box, Button, Typography } from "@mui/material";
//import avatarDemo from "./avatarDemo.png";
import SubjectChip from "components/content_components/SubjectChip.tsx";
import { SubjectType } from "~/types/data_types";
import CustomButton from "../CustomButton";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";

export default function TutorCard({ profile }: { profile: ProfileType }) {
  const theme = useTheme<Theme>();

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
      <Avatar
        sx={{
          borderRadius: "50%",
          marginRight: "1em",
          width: "4em",
          height: "4em",
        }}
        //{...stringAvatar(profile.full_name)}
        alt={profile.full_name}
      />
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
