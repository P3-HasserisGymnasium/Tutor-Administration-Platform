import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import SubjectIcon from "~/components/content_components/SubjectIcon";
import { CollaborationType } from "~/types/entity_types";
import { useNavigate } from "react-router-dom";
import { useRolePrefix } from "~/utilities/helperFunctions";

export default function MiniCollab({ collaboration }: { collaboration: CollaborationType }) {
	const navigate = useNavigate();
	const rolePrefix = useRolePrefix();

	return (
		<Card
			data-testid="collabcontainer"
			onClick={() => navigate(`${rolePrefix}/collaboration/${collaboration.id}`)}
			sx={{
				width: 200,
				borderRadius: 2,
				boxShadow: 3,
				backgroundColor: "#BEE2FD",
				textAlign: "center",
				padding: 1,
				"&:hover": {
					backgroundColor: "#9fc8e7",
					cursor: "pointer",
				},
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
					<SubjectIcon Subject={collaboration.subject} />
					<Avatar
						alt={collaboration.tutor_name || "No collaborator"}
						sx={{
							width: 70,
							height: 70,
							margin: "1 auto",
							marginBottom: 1,
							display: "flex",
							alignSelf: "flex-right",
						}}
						variant="circular"
					>
						P3
					</Avatar>
				</Box>

				{/* Collaboration Text */}
				<Typography
					variant="body2"
					sx={{ fontSize: 15, color: "black", fontWeight: "bold" }}
					data-testid="collabwithname"
				>
					Collaboration with {collaboration.tutor_name}
				</Typography>
			</CardContent>
		</Card>
	);
}
