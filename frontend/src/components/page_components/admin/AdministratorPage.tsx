import { Box, ThemeProvider, Typography } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useRoleService } from "~/api/services/roleService";
import ShortOnShortShortOnShortBoxLayout from "~/components/layout_components/ShortOnShortShortOnShortBoxLayout";
import AdminRequests from "./AdminManageRequests";
import AdminManageTutees from "./AdminManageTutees";
import { useCurrentTheme } from "~/utilities/helperFunctions";
import AdminOverview from "./AdminOverview";
import AdminManageTutors from "./AdminManageTutors";

export default function AdministratorPage() {
	const theme = useCurrentTheme();

	const { data: tutors, isLoading: isTutorsLoading } = useRoleService().getTutors();
	const { data: tutees, isLoading: isTuteesLoading } = useRoleService().getTutees();
	const { data: collaborations } = useCollaborationService().getCollabortations();

	let tutorCount = tutors?.length;
	let tuteeCount = tutees?.length;
	let collaborationCount = collaborations?.length;
	return (

		<ThemeProvider theme={theme}>
			<ShortOnShortShortOnShortBoxLayout>
				<Box sx={{ height: "100%", width: "100%" }}>
					<Typography variant="h1" sx={{ paddingTop: 3, paddingLeft: 3 }}>
						Requests
					</Typography>
					<AdminRequests />
				</Box>
				<Box sx={{ height: "100%", width: "95%" }}>
					<Typography variant="h1" sx={{ paddingTop: 3, paddingLeft: 3 }}>
						Manage tutees
					</Typography>
					<AdminManageTutees tutees={tutees} isLoading={isTuteesLoading} />
				</Box>
				<Box sx={{ height: "100%", width: "100%" }}>
					<Typography variant="h1" sx={{ paddingTop: 3, paddingLeft: 3 }}>
						Overview
					</Typography>
					<AdminOverview
						tutorCount={tutorCount}
						tuteeCount={tuteeCount}
						collaborationCount={collaborationCount} />
				</Box>
				<Box sx={{ height: "100%", width: "100%" }}>
					<Typography variant="h1" sx={{ paddingTop: 3, paddingLeft: 3 }}>
						Manage tutors
					</Typography>
					<AdminManageTutors tutors={tutors} isLoading={isTutorsLoading} />
				</Box>
			</ShortOnShortShortOnShortBoxLayout >
		</ThemeProvider>
	);
}
