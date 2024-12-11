import { Box, Button, Typography } from "@mui/material";
import { useHeading } from "utilities/helperFunctions";
import { useTheme } from "@mui/system";
import SpeedDialMenu from "./SpeedDialMenu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import { useAuth } from "~/api/authentication/useAuth";
import { Role } from "~/types/data_types";
export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const { userState } = useAuth();
  const currentLocation: string = useLocation().pathname;
  const isBoth = userState.role?.includes(Role.Enum.Tutee) && userState.role?.includes(Role.Enum.Tutor);
  const showBackArrow =
    ((currentLocation === "/tutee" || currentLocation === "/tutor") && isBoth) ||
    (currentLocation !== "/tutee" && currentLocation !== "/tutor" && currentLocation !== "/");

  return (
    <Box
      sx={{
        height: "5em",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          height: "calc(100% - 16px)",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginLeft: 3,
        }}
      >
        {showBackArrow && (
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "transparent" },
              "&:focus": { outline: "none" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disableRipple
          >
            <ArrowBackIcon sx={{ color: theme.customColors.arrowColor, fontSize: 35 }} />
          </Button>
        )}

        <Typography color={theme.customColors.headingTextColor} variant="h1">
          {useHeading()}
        </Typography>
      </Box>
      <Typography color={theme.customColors.headingTextColor} variant="h1">
        {userState.name ? userState.name : ""}
      </Typography>
      <SpeedDialMenu />
    </Box>
  );
}
