import { Box, Paper } from "@mui/material";
import { Children } from "react";
import React from "react";
import { useVariableWidth, useWrap, useVariableHeight } from "~/utilities/helperFunctions";

export default function EvenBoxLayout({ children }: { children: React.ReactNode }) {
  const numberOfChildren = Children.count(children);
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
      {Children.toArray(children).map((child, index) => (
        <Section key={"hadhsad" + index} child={child} numberOfChildren={numberOfChildren} />
      ))}
    </Box>
  );
}

function Section({ child, numberOfChildren }: { child: React.ReactNode; numberOfChildren: number }) {
  return (
    <Paper
      elevation={3}
      sx={{
        margin: 1,
        width: useVariableWidth(1 / numberOfChildren),
        height: useVariableHeight("calc(100% - 16px)"),
      }}
    >
      {child}
    </Paper>
  );
}
