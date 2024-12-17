import { Box, Button, Paper, Typography } from "@mui/material";
import { CollaborationType } from "~/types/entity_types";
import React from "react";
import AcceptCollaborationRequestDialog from "./AcceptCollaborationRequestDialog";

type AwaitingCollabAcceptanceBoxprops = {
	collab: CollaborationType;
};

export function AwaitingCollabAcceptanceBox({ collab }: AwaitingCollabAcceptanceBoxprops) {
	const [handleDialog, setHandleDialog] = React.useState(false);

	return (
		<>
			<AcceptCollaborationRequestDialog open={handleDialog} setOpen={setHandleDialog} collaboration={collab} />
			<Paper
				onClick={() => setHandleDialog(true)}
				elevation={8}
				sx={{
					mb: 2,
					borderRadius: 100,
					display: "flex",
					width: "98%",
					height: "50px",
					minHeight: "50px",

					border: "1.5px solid black",
					"&:hover": {
						cursor: "pointer",
						boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
					},
				}}
			>
				<Box
					sx={{ borderRadius: 100, backgroundColor: "blue", width: 1 / 5, display: "flex", alignItems: "center", justifyContent: "center" }}
				>
					<Typography variant="h6" sx={{ color: "white" }}>
						Collaboration
					</Typography>
				</Box>
				<Box sx={{ width: 3 / 5, display: "flex", alignItems: "center", justifyContent: "flex-start", pl: 2 }}>
					<Typography variant="h5" sx={{ color: "black", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
						{collab.tuteeName} and {collab.tutorName}
					</Typography>
				</Box>
				<Box sx={{ width: 1 / 5, display: "flex", alignItems: "center", justifyContent: "flex-end", pr: 1 }}>
					<Button sx={{ borderRadius: 100, fontSize: "1.5em", color: "white", backgroundColor: "black", height: "40px" }}>Review</Button>
				</Box>
			</Paper>
		</>
	);
}
