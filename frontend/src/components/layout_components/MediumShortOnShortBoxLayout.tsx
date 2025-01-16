import { Box, Paper } from "@mui/material";
import { Children } from "react";
import React from "react";
import { useVariableWidth, useWrap, useVariableHeight } from "~/utilities/helperFunctions";

export default function MediumShortOnShortBoxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: useWrap(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          margin: 1,
          width: useVariableWidth(1 / 2),
          height: useVariableHeight("calc(100% - 16px)"),
        }}
      >
        {Children.toArray(children)[0]}
      </Paper>
      <Box
        sx={{
          margin: 1,
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
          {Children.toArray(children)[1]}
        </Paper>
        <Paper elevation={3} sx={{ width: "100%", height: "50%" }}>
          {Children.toArray(children)[2]}
        </Paper>
      </Box>
    </Box>
  );
}
