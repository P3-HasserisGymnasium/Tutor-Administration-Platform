import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRolePrefix } from "~/utilities/helperFunctions";

export default function Forbidden() {
	const firstPath = useRolePrefix();
	let navigationPath = "";
	switch (firstPath) {
		case "/tutee":
			navigationPath = "/tutor";
			break;
		case "/tutor":
			navigationPath = "/tutee";
			break;
		default:
			navigationPath = "/";
	}

	return (
		<Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<Box sx={{ textAlign: "center" }}>
				<Typography variant="h2">You do not have permission to view this page</Typography>
				<Link style={{ cursor: "pointer" }} to={navigationPath}>
					<Typography
						variant="h3"
						mt={2}
						sx={{ textDecoration: "none", color: "black", "&:hover": { textDecoration: "underline" } }}
					>
						Go back
					</Typography>
				</Link>
			</Box>
		</Box>
	);
}
