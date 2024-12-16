import { ThemeProvider } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { useRoleService } from "~/api/services/role-service";
import ShortOnShortShortOnShortBoxLayout from "~/components/layout_components/ShortOnShortShortOnShortBoxLayout";
import AdminRequests from "./AdminManageRequests";
import AdminManageTutees from "./AdminManageTutees";
import { useCurrentTheme } from "~/utilities/helperFunctions";
import AdminOverview from "./AdminOverview";
import AdminManageTutors from "./AdminManageTutors";
import { CollaborationState, tutorListFilterType } from "~/types/data_types";
import { CollaborationType } from "~/types/entity_types";

export default function AdministratorPage() {
  const theme = useCurrentTheme();
  const emptyFilter: tutorListFilterType = {
    subjects: [],
    time_availability: [],
    year_group: [],
    languages: [],
  };
  const { data: tutors, isLoading: isTutorsLoading } = useRoleService().useGetTutors(emptyFilter);
  const { data: tutees, isLoading: isTuteesLoading } = useRoleService().useGetTutees();
  const { data: collablist, isLoading: isCollaborationsLoading } = useCollaborationService().useGetCollabortations();
  const establishedCollabs = collablist?.filter((collab: CollaborationType) => collab.state === CollaborationState.Enum.ESTABLISHED);
  const awaitingCollabs = collablist?.filter((collab: CollaborationType) => collab.state === CollaborationState.Enum.WAITING_FOR_ADMIN);
  return (
    <ThemeProvider theme={theme}>
      <ShortOnShortShortOnShortBoxLayout>
        <AdminRequests awaitingAcceptanceCollabs={awaitingCollabs} isLoading={isCollaborationsLoading} />
        <AdminManageTutees tutees={tutees} isLoading={isTuteesLoading} />
        <AdminOverview tutorCount={tutors?.length} tuteeCount={tutees?.length} collaborationCount={establishedCollabs?.length} />
        <AdminManageTutors tutors={tutors} isLoading={isTutorsLoading} />
      </ShortOnShortShortOnShortBoxLayout>
    </ThemeProvider>
  );
}
