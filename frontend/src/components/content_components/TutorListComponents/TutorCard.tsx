import * as React from "react";
import { TutorProfileType } from "~/types/entity_types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import avatarDemo from "./avatarDemo.png";
import SubjectChip from "components/content_components/SubjectChip.tsx";
import { SubjectType } from "~/types/data_types";
import CustomButton from "../CustomButton";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import TutorProfileDialog from "~/components/page_components/dialogs/ProfileDialog";

export default function TutorCard({ profile }: { profile: TutorProfileType }) {
  const theme = useTheme<Theme>();

  const [open, setOpen] = React.useState(false);

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
        src={avatarDemo}
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
        <Button variant="contained" sx={{marginBottom:"0.5em"}} onClick={() => setOpen(true)}>
          View profile
        </Button>
        <TutorProfileDialog open={open} setOpen={setOpen} tutorProfile={profile} />
        <CustomButton customType="success">
          Request collaboration
        </CustomButton>
      </Box>
    </Box>
  );
}
