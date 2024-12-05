import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Role } from "~/types/data_types";
import { useAuth } from "./useAuth";

export default function NotFound() {
  const { userState } = useAuth();

  // Determine the user's roles
  const isTutee = userState.role?.includes(Role.Enum.Tutee);
  const isTutor = userState.role?.includes(Role.Enum.Tutor);

  const navigationPath = isTutee ? "/tutee" : isTutor ? "/tutor" : "/";

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1">This page does not exist</Typography>
        <Link style={{ cursor: "pointer" }} to={navigationPath}>
          <Typography
            variant="h2"
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
