import { Box, Typography } from "@mui/material";
import TuteeIcon from "src/assets/TuteeIcon.svg";
import TutorIcon from "src/assets/TutorIcon.svg";
import CollaborationIcon from "src/assets/CollaborationIcon.svg";

interface AdminOverviewProps {
	tuteeCount: number | undefined;
	tutorCount: number | undefined;
	collaborationCount: number | undefined;
}

export default function AdminOverview({ tuteeCount, tutorCount, collaborationCount }: AdminOverviewProps) {
	return (
		<>
			<Typography sx={{ ml: 2, mt: 2 }} variant="h1">
				Overview
			</Typography>
			<Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
				<Box sx={{ alignItems: "center", justifyContent: "center" }}>
					<img src={TuteeIcon} style={{ width: "100%" }}></img>
					<Typography variant="h2" sx={{ textAlign: "center" }}>
						{tuteeCount ? (tuteeCount == 1 ? "1 tutee" : tuteeCount + " tutees") : "0 tutees"}
					</Typography>
				</Box>
				<Box sx={{ alignItems: "center", justifyContent: "center", paddingBottom: "100px" }}>
					<img src={CollaborationIcon} style={{ width: "100%" }}></img>
					<Typography variant="h2" sx={{ textAlign: "center" }}>
						{collaborationCount
							? collaborationCount == 1
								? "1 collaboration"
								: collaborationCount + " collaborations"
							: "0 collaborations"}
					</Typography>
				</Box>
				<Box sx={{ alignItems: "center", justifyContent: "center", paddingTop: "25px" }}>
					<img src={TutorIcon} style={{ width: "100%" }}></img>
					<Typography variant="h2" sx={{ textAlign: "center" }}>
						{tutorCount ? (tutorCount == 1 ? "1 tutor" : tutorCount + " tutors") : "0 tutors"}
					</Typography>
				</Box>
			</Box>
		</>
	);
}
