import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Forbidden() {
  const firstPath = useLocation().pathname.split("/").filter(Boolean)[0];
  let navigationPath = "";
  if (firstPath === "tutee") {
    navigationPath = "/tutor";
  } else if (firstPath === "tutor") {
    navigationPath = "/tutee";
  } else {
    navigationPath = "/";
  }

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">You do not have permission to view this page</Typography>
        <Link style={{ cursor: "pointer" }} to={navigationPath}>
          <Typography
            variant="h3"
            mt={2}
            sx={{ textDecoration: "none", color: "black", "&:hover": { textDecoration: "underline" } }}
          >
            Go back
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
