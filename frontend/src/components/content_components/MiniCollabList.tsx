//import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MiniCollab from "./MiniCollab";
import { CollaborationType } from "~/types/entity_types";

type MiniCollabListProps = {
  collaborations: CollaborationType[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default function MiniCollabList({ collaborations, isLoading, isError }: MiniCollabListProps) {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <Typography variant="h6">Error fetching posts. Please refresh the page.</Typography>;
  }
  if (!collaborations) return <Typography variant="h6">No active collaborations found.</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "start",
        padding: 2,
      }}
    >
      {collaborations.length > 0 ? (
        collaborations?.map((collab, i) => <MiniCollab key={"27389217389123" + i} collaboration={collab} />)
      ) : (
        <Typography variant="h6">No active collaborations found.</Typography>
      )}
    </Box>
  );
}
