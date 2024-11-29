import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { SubjectType } from "src/types/data_types"; // Import the Subject enum and mapping
import SubjectIcon from "./SubjectIcon";

interface MiniCollabProb {
	subject: SubjectType;
	collaborator: string;
	avatar: string;
}

export default function MiniCollab({
	subject,
	collaborator,
	avatar,
}: MiniCollabProb) {
	return (
		<Card
			sx={{
				width: 200,
				borderRadius: 2,
				boxShadow: 3,
				backgroundColor: "#BEE2FD",
				textAlign: "center",
				padding: 1,
			}}
		>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 1,
						marginBottom: 1,
					}}
				>
					<SubjectIcon Subject={subject} />

					<Avatar
						alt={collaborator || "No collaborator"}
						src={avatar}
						sx={{
							width: 70,
							height: 70,
							margin: "1 auto",
							marginBottom: 1,
							display: "flex",
							alignSelf: "flex-right",
						}}
					/>
				</Box>

				{/* Collaboration Text */}
				<Typography
					variant="body1"
					sx={{ fontSize: 14, color: "black" }}
				>
					Collaboration with {collaborator}
				</Typography>
			</CardContent>
		</Card>
	);
}
