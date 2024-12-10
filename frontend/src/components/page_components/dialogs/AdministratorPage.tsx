import { Box, Typography } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useRoleService } from "~/api/services/roleService";
import ShortOnShortShortOnShortBoxLayout from "~/components/layout_components/ShortOnShortShortOnShortBoxLayout";
import TuteeIcon from "src/assets/TuteeIcon.svg";
import TutorIcon from "src/assets/TutorIcon.svg";
import CollaborationIcon from "src/assets/CollaborationIcon.svg";

export default function AdministratorPage() {
	const { data: tutors } = useRoleService().getTutors();
	const { data: tutees } = useRoleService().getTutees();
	const { data: collaborations } = useCollaborationService().getCollabortations();

	let tutorCount = 0;
	let tuteeCount = 0;
	let collaborationCount = 0;

	if (tutors != undefined) {
		tutorCount = tutors.length;
	}
	if (tutees != undefined) {
		tuteeCount = tutees.length;
	}
	if (collaborations != undefined) {
		collaborationCount += collaborations.length;
	}

	return (
		<ShortOnShortShortOnShortBoxLayout>
			<div>Requests here</div>
			<div>Something there</div>
			<Box sx={{ height: "100%", width: "100%", padding: 3 }}>
				<Typography variant="h1">
					Overview
				</Typography>
				<Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
					<Box sx={{ alignItems: "center", justifyContent: "center" }}>
						<img src={TuteeIcon} style={{ width: "100%" }}></img>
						<Typography variant="h2" sx={{ textAlign: "center" }}>
							{tuteeCount} tutees
						</Typography>
					</Box>
					<Box sx={{ alignItems: "center", justifyContent: "center", paddingBottom: "100px" }}>
						<img src={CollaborationIcon} style={{ width: "100%" }}></img>
						<Typography variant="h2" sx={{ textAlign: "center" }}>
							{collaborationCount} collaborations
						</Typography>
					</Box>
					<Box sx={{ alignItems: "center", justifyContent: "center", paddingTop: "25px" }}>
						<img src={TutorIcon} style={{ width: "100%" }}></img>
						<Typography variant="h2" sx={{ textAlign: "center" }}>
							{tutorCount} tutors
						</Typography>
					</Box>
				</Box>

			</Box>
			<div>Something where</div>
		</ShortOnShortShortOnShortBoxLayout >
	);
}
