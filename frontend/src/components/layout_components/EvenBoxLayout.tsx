import { Box, Paper } from "@mui/material";
import { Children } from "react";
import React from "react";

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Children.map(children, (child) => (
        <Paper
          elevation={3}
          sx={{
            margin: 1,
            width: "calc(50% - 8px)",
            height: "calc(100% - 16px)",
          }}
        >
          {child}
        </Paper>
      ))}
    </Box>
  );
}
