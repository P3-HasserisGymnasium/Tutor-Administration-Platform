import { Box, CircularProgress } from "@mui/material";
import Navbar from "~/components/layout_components/navbar/Navbar";
import { useBreakpoints } from "~/utilities/helperFunctions";

export default function Loading() {
  const { isMobile, hasScrollbar } = useBreakpoints();
  const widthRightOffset = hasScrollbar ? "16px" : "0px";

  return (
    <Box
      sx={{
        height: isMobile ? "auto" : "100vh",
        width: isMobile ? `calc(100vw - ${widthRightOffset})` : "100vw",
      }}
    >
      <Navbar />
      <Box sx={{ height: "88vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={150} />
      </Box>
    </Box>
  );
}
