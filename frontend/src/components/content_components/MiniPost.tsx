import { Box, Typography } from "@mui/material";
import SubjectChip from "./SubjectChip";
import { PostType } from "~/types/entity_types";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import EditPostDialog from "components/page_components/dialogs/EditPostDialog";
import { useState } from "react";
import { useRolePrefix } from "~/utilities/helperFunctions";
import AcceptPostDialog from "../page_components/dialogs/AcceptPostDialog";

type MiniPostProp = {
  postData: PostType;
};

export default function MiniPost({ postData }: MiniPostProp) {
  const theme = useTheme<Theme>();
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [showAcceptPostDialog, setShowAcceptPostDialog] = useState(false);

  const rolePrefix = useRolePrefix();

  const handleOpenMiniPost = () => {
    if (rolePrefix !== "/tutor") {
      setShowEditPostDialog(true);
    } else {
      setShowAcceptPostDialog(true);
    }
  };

  return (
    <Box
      data-testid="minipostcontainer"
      onClick={handleOpenMiniPost}
      sx={{
        "&:hover": {
          cursor: "pointer",
          backgroundColor: theme.palette.augmentColor({ color: { main: theme.customColors.postBackGroundColor } }).dark,
        },
        backgroundColor: theme.customColors.postBackGroundColor,
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
      <AcceptPostDialog open={showAcceptPostDialog} setOpen={setShowAcceptPostDialog} post={postData} />
      <Typography data-testid="posttitle" variant="h4">
        {postData.title || "No Title"}
      </Typography>

      <Box>
        <SubjectChip Subject={postData.subject} />

        <Typography data-testid="postduration">{getDuration(postData.duration)}</Typography>
      </Box>
    </Box>
  );
}

function getDuration(duration: number[] | undefined | null) {
  if (duration === undefined || duration === null) {
    return "Duration not specified";
  } else if (duration[0] === duration[1]) {
    return `Duration: ${duration[0]} months`;
  } else {
    return `Duration: ${duration[0]}-${duration[1]} months`;
  }
}
