import { Box, Typography } from "@mui/material";
import SubjectChip from "./SubjectChip";
import { PostType } from "~/types/entity_types";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";

type MiniPostProp = {
  postData: PostType;
};

export default function MiniPost({ postData }: MiniPostProp) {
  const theme = useTheme<Theme>();
  return (
    <Box
      data-testid="minipostcontainer"
      sx={{
        backgroundColor: theme.customColors.collaborationBackgroundColor,
        border: "1px solid rgba(173, 92, 0, 1)",
        width: "200px",
        height: "80%",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 1,
      }}
    >
      <Typography
        data-testid="posttitle"
        variant="h4"
      >
        {postData.title || "No Title"}
      </Typography>

      <Box>
        <SubjectChip Subject={postData.subject} />

        <Typography
         
          data-testid="postduration"
        >
          Duration:{postData?.duration ? postData.duration : "No duration"}
        </Typography>
      </Box>
    </Box>
  );
}
