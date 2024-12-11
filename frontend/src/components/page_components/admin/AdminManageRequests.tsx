import { Box, Typography } from "@mui/material";

export default function AdminRequests() {
  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
        <Typography variant="h1">Requests</Typography>
        <Typography mb={0.5} ml={2} variant="h4">
          Click on a tutee to manage them
        </Typography>
      </Box>{" "}
      <Typography mb={0.5} ml={2} variant="h1">
        Du må selv lave query til det her patrick, det er collab endpoints du skal bruge
      </Typography>
    </Box>
  );
}
