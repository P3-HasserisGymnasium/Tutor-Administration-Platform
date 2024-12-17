import { Box, Button, Paper, Typography } from "@mui/material";
import { PostType } from "~/types/entity_types";
import React from "react";
import CreateCollaborationSuggestionDialog from "./CreateCollaborationSuggestionDialog";

type PairingRequestBoxProps = {
  post: PostType;
};

export function PairingRequestBox({ post }: PairingRequestBoxProps) {
  const [handleDialog, setHandleDialog] = React.useState(false);

  return (
    <>
      <CreateCollaborationSuggestionDialog open={handleDialog} setOpen={setHandleDialog} post={post} />
      <Paper
        onClick={() => setHandleDialog(true)}
        elevation={8}
        sx={{
          mb: 2,
          display: "flex",
          width: "98%",
          borderRadius: 100,
          height: "50px",
          minHeight: "50px",
          border: "1.5px solid black",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box sx={{ borderRadius: 100, backgroundColor: "green", width: 1 / 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Pairing help
          </Typography>
        </Box>
        <Box sx={{ width: 3 / 5, display: "flex", alignItems: "center", justifyContent: "flex-start", pl: 2 }}>
          <Typography variant="h5" sx={{ color: "black", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {post.title}
          </Typography>
        </Box>
        <Box sx={{ width: 1 / 5, display: "flex", alignItems: "center", justifyContent: "flex-end", pr: 1 }}>
          <Button sx={{ borderRadius: 100, fontSize: "1.5em", color: "white", backgroundColor: "black", height: "40px" }}>Review</Button>
        </Box>
      </Paper>
    </>
  );
}
