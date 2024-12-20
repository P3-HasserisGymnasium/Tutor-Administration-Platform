import { Box, Typography } from "@mui/material";
import { useHeading } from "utilities/helperFunctions";
import HeadText from "components/layout_components/HeadText";
import { useTheme } from "@mui/system";


export default function Navbar() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "10%",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <HeadText DisplayText={useHeading()} />
      <Box
        sx={{
          margin: 1,
          width: "calc(20% - 16px)",
          height: "calc(100% - 16px)",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <Typography variant="h3"> ICON </Typography>
      </Box>
    </Box>
  );
}
