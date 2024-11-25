import { Box, Paper } from "@mui/material";
import { Children } from "react";
import React from "react";

export default function ShortLongBoxLayout({
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
			<Paper
				elevation={3}
				sx={{
					margin: 1,
					width: 1/3,
					height: "calc(100% - 16px)",
				}}
			>
				{Children.toArray(children)[0]}
			</Paper>
			<Paper
				elevation={3}
				sx={{
					margin: 1,
					width: 2/3,
					height: "calc(100% - 16px)",
				}}
			>
				{Children.toArray(children)[1]}
			</Paper>
		</Box>
	);
}
