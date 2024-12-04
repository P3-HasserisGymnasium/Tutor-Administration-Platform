import { Box, Button, Typography } from "@mui/material";
import { useHeading } from "utilities/helperFunctions";
import { useTheme } from "@mui/system";
import SpeedDialMenu from "./SpeedDialMenu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Theme } from "@mui/material/styles";
export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const arrowColor =
    useLocation().pathname.split("/").filter(Boolean)[0] == "tutee" ? theme.customColors.headingTextColor : "white"; // because someone is weird with themes

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
          width: "calc(80% - 16px)",
          height: "calc(100% - 16px)",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          marginLeft: 3,
        }}
      >
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
          <ArrowBackIcon sx={{ color: arrowColor, fontSize: 35 }} />
        </Button>
        <Typography variant="h1"> {useHeading()} </Typography>
      </Box>
      <SpeedDialMenu />
    </Box>
  );
}
