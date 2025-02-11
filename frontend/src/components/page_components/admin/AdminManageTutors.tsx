import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { TutorProfileType } from "~/types/entity_types";
import { TutorProfileBox } from "./admin_components/TutorProfileBox";

type AdminManageTutorProps = {
	tutors?: TutorProfileType[] | undefined;
	isLoading?: boolean;
};

export default function AdminManageTutors({ tutors, isLoading }: AdminManageTutorProps) {
	if (isLoading) return <CircularProgress />;
	return (
		<Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
				<Typography variant="h1">Manage Tutors</Typography>
				<Typography mb={0.5} ml={2} variant="h4">
					Click on a tutor to manage them
				</Typography>
			</Box>

			<Box sx={{ width: "100%", display: "flex", height: "80%", alignItems: "center", justifyContent: "space-evenly" }}>
				{Array.isArray(tutors) &&
					tutors.map((tutor, i) => {
						if (i > 2) return null;
						return <TutorProfileBox key={tutor.id} tutor={tutor} />;
					})}
				{tutors == undefined && <Typography>No tutees</Typography>}
			</Box>
			<Box sx={{ display: "flex", height: "20%", justifyContent: "flex-end", alignItems: "center", mr: 1 }}>
				<Button sx={{ height: "50px", fontSize: 18 }} variant="contained" color="primary">
					View all tutors
				</Button>
			</Box>
		</Box>
	);
}
