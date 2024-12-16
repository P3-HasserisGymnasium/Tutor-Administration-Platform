import { ThemeProvider } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useRoleService } from "~/api/services/role-service";
import ShortOnShortShortOnShortBoxLayout from "~/components/layout_components/ShortOnShortShortOnShortBoxLayout";
import AdminRequests from "./AdminManageRequests";
import AdminManageTutees from "./AdminManageTutees";
import { useCurrentTheme } from "~/utilities/helperFunctions";
import AdminOverview from "./AdminOverview";
import AdminManageTutors from "./AdminManageTutors";
import { tutorListFilterType } from '~/types/data_types';

export default function AdministratorPage() {
	const theme = useCurrentTheme();
	const emptyFilter: tutorListFilterType = {
		subjects: [],
		time_availability: [],
		year_group: [],
		languages: [],
	}
	const { data: tutors, isLoading: isTutorsLoading } = useRoleService().useGetTutors(emptyFilter);
	const { data: tutees, isLoading: isTuteesLoading } = useRoleService().useGetTutees();
	const { data: collaborations, isLoading: isCollaborationsLoading } = useCollaborationService().getCollabortations();

	return (
		<ThemeProvider theme={theme}>
			<ShortOnShortShortOnShortBoxLayout>
				<AdminRequests collaborations={collaborations} isLoading={isCollaborationsLoading} />
				<AdminManageTutees tutees={tutees} isLoading={isTuteesLoading} />
				<AdminOverview tutorCount={tutors?.length} tuteeCount={tutees?.length} collaborationCount={collaborations?.length} />
				<AdminManageTutors tutors={tutors} isLoading={isTutorsLoading} />
			</ShortOnShortShortOnShortBoxLayout>
		</ThemeProvider>
	);
}
