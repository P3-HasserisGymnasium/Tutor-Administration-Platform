import { Paper, Box, Typography } from "@mui/material";
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { TuteeProfileType } from "~/types/entity_types";
import ManageTuteeDialog from "./ManageTuteeDialog";
import React from "react";

type TutorProfileBoxProps = {
	tutee: TuteeProfileType;
};

export function TuteeProfileBox({ tutee }: TutorProfileBoxProps) {
	const [manageDialog, setManageDialog] = React.useState(false);

	return (
		<>
			<ManageTuteeDialog open={manageDialog} setOpen={setManageDialog} tuteeProfile={tutee} />
			<Paper
				onClick={() => setManageDialog(true)}
				elevation={8}
				sx={{
					width: 2 / 7,
					height: "75%",
					border: "2px solid black",
					borderRadius: "0.75em",
					"&:hover": {
						cursor: "pointer",
						boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
					},
				}}
			>
				<Box sx={{ height: "50%", width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
					<Box sx={{ width: "25%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
						<InitialsAvatar fullName={tutee.full_name} sx={{ height: "4em", width: "4em" }} />
					</Box>
					<Box sx={{ width: "25%", height: "50%" }}>
						<Typography variant="h6" sx={{ textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
							<b>{tutee.full_name}</b>
						</Typography>
					</Box>
				</Box>
				<Box sx={{ height: "50%", width: "100%", mt: 2 }}>
					<Typography variant="body1" sx={{ textAlign: "center" }}>
						Year: {tutee.year_group}
					</Typography>
					<Typography variant="body1" sx={{ textAlign: "center" }}>
						Speaks: {tutee.languages.map((language) => language).join(", ")}
					</Typography>
				</Box>
			</Paper>
		</>
	);
}
