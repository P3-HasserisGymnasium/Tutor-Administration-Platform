import { Box, Typography } from "@mui/material";
import SubjectChip from "./SubjectChip";
import { PostType } from "~/types/entity_types";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import EditPostDialog from "components/page_components/dialogs/EditPostDialog";
import { useState } from "react";

type MiniPostProp = {
  postData: PostType;
};

export default function MiniPost({ postData }: MiniPostProp) {
  const theme = useTheme<Theme>();
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);

  return (
    <Box
      data-testid="minipostcontainer"
      onClick={() => setShowEditPostDialog(true)}
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
      <EditPostDialog open={showEditPostDialog} setOpen={setShowEditPostDialog} post={postData} />
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
          {getDuration(postData.duration)}
        </Typography>
      </Box>
    </Box>
  );
}

function getDuration(duration: number[] | undefined | null) {
  if (duration === undefined || duration === null) {
    return "Duration not specified";
  }
  else if (duration[0] === duration[1]) {
    return `Duration: ${duration[0]} months`;
  }
  else{
    return `Duration: ${duration[0]}-${duration[1]} months`;
  }
}