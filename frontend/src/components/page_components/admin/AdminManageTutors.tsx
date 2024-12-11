import { CircularProgress, Typography, Box, Avatar, Grid2, Paper } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { TutorProfileType } from "~/types/entity_types";

type AdminManageTutorProps = {
    tutors?: TutorProfileType[] | undefined;
    isLoading?: boolean;
}

export default function AdminManageTutors({ tutors, isLoading }: AdminManageTutorProps) {

    console.log("tutors", tutors);
    console.log(isLoading);

    tutors?.forEach(tutor => {
        console.log("tutor name: ", tutor.full_name)
    })

    if (isLoading) return <CircularProgress />
    return (
        <Box sx={{ height: "calc(100% - 5em)", width: "50%", maxHeight: "calc(100% - 5em)" }}>
            <Box sx={{ display: "flex", flexDirection: "row", height: "85%", width: "90%", marginLeft: 3, paddingTop: 2, marginRight: 3 }}>
                <Box sx={{ display: "flex", width: "92%", gap: 2, height: "100%", flexDirection: "row", overflowX: "auto", padding: 2 }}>

                    {tutors?.map((tutor) => {
                        const { data: collaborations } = useCollaborationService().useGetCollaborationsWithTutor(tutor.id);
                        let collaborationCount = collaborations?.length;
                        let pendingCollaborationCount = 0;
                        collaborations?.map((collab) => {
                            if (collab.state == "WAITINGFORTUTOR" || collab.state == "PENDING") pendingCollaborationCount++;
                        })
                        return (
                            <Paper sx={{ display: "flex", flexDirection: "column", padding: 2, width: "30%", justifyContent: "center", outline: 1 }}>
                                {/* Picture and Name Row */}
                                <Grid2 container spacing={2} alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
                                    <Avatar
                                        alt="User Name"
                                        src="/path-to-image.jpg"
                                        sx={{ width: 80, height: 80 }}
                                    />
                                    <Typography sx={{ overflow: "auto" }} variant="h5" >{tutor.full_name}</Typography>
                                </Grid2>

                                {/* Info Row */}
                                <Box sx={{ marginBottom: 2, alignItems: "center", justifyContent: "center" }}>
                                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                                        {collaborationCount} <strong> collaborations</strong>
                                    </Typography>
                                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                                        {pendingCollaborationCount} <strong> pending requests</strong>
                                    </Typography>
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>
            </Box >
        </Box>
    );
}