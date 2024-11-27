import { Box, Paper } from "@mui/material";
import { Children } from "react";
import React from "react";
import {
  useVariableWidth,
  useWrap,
  useVariableHeight,
} from "~/utilities/helperFunctions";

export default function EvenBoxLayout({
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
        flexWrap: useWrap(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          margin: 1,
          width: useVariableWidth(1 / 3),
          height: useVariableHeight("calc(100% - 16px)"),
        }}
      >
        {Children.toArray(children)[0]}
      </Paper>
      <Paper
        elevation={3}
        sx={{
          margin: 1,
          width: useVariableWidth(2 / 3),
          height: useVariableHeight("calc(100% - 16px)"),
        }}
      >
        {Children.toArray(children)[1]}
      </Paper>
    </Box>
  );
}
