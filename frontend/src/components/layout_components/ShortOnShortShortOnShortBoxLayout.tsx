import { Box, Paper } from "@mui/material";
import { Children } from "react";

export default function ShortOnShortShortOnShortBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: 1,
          gap: 1,
          width: "calc(50% - 8px)",
          height: "calc(100% - 16px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[0]}
        </Paper>
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[1]}
        </Paper>
      </Box>
      <Box
        sx={{
          margin: 1,
          gap: 1,
          width: "calc(50% - 8px)",
          height: "calc(100% - 16px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[2]}
        </Paper>
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[3]}
        </Paper>
      </Box>
    </Box>
  );
}