import { Box, Paper } from "@mui/material";
import { Children } from "react";
import {
  useVariableWidth,
  useWrap,
  useVariableHeight,
} from "~/utilities/helperFunctions";

export default function ShortOnShortMediumBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        gap: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: useWrap(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: 1,
          gap: 1,
          width: useVariableWidth(1 / 2),
          height: useVariableHeight("calc(100% - 16px)"),
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
      <Paper
        elevation={3}
        sx={{
          margin: 1,
          width: useVariableWidth(1 / 2),
          height: useVariableHeight("calc(100% - 16px)"),
        }}
      >
        {Children.toArray(children)[2]}
      </Paper>
    </Box>
  );
}
