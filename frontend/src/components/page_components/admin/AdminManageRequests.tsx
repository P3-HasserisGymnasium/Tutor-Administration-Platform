import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { CollaborationType } from "~/types/entity_types";
import CollaborationBox from "./admin_components/CollaborationBox";

type AdminRequestsProps = {
    collaborations: CollaborationType[] | undefined,
    isLoading: Boolean
}

export default function AdminRequests({ collaborations, isLoading }: AdminRequestsProps) {
    const { data: requests, isLoading: isRequestsLoading } = useCollaborationService().getCollaborationSuggestionRequests();
    if (isLoading || isRequestsLoading) return <CircularProgress />;

    const allCollaborations: CollaborationType[] = collaborations != undefined && requests != undefined ? [...collaborations, ...requests] : [];

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h1">Manage Requests</Typography>
            </Box>

            <Box sx={{ width: "100%", display: "flex", height: "80%", alignItems: "center", justifyContent: "space-evenly" }}>
                {allCollaborations?.map((collaboration, i) => {
                    if (i > 2 || collaboration == undefined) return null;
                    return <CollaborationBox collaboration={collaboration} />;
                })}
            </Box>
            <Box sx={{ display: "flex", height: "20%", justifyContent: "flex-end", alignItems: "center", mr: 1 }}>
                <Button sx={{ height: "50px", fontSize: 18 }} variant="contained" color="primary">
                    View all requests
                </Button>
            </Box>
        </Box>
    );
}
