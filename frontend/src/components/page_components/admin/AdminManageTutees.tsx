import { CircularProgress, Typography, Box, Button, Avatar, Grid2, Paper } from "@mui/material";
import { useCollaborationService } from "~/api/services/collaboration-service";
import { TuteeProfileType } from "~/types/entity_types";

type AdminManageTuteeProps = {
    tutees?: TuteeProfileType[] | undefined;
    isLoading?: boolean;
}

export default function AdminManageTutees({ tutees, isLoading }: AdminManageTuteeProps) {
    /*tutors?.forEach(tutor => {
        console.log("tutor name: ", tutor.full_name)
    })*/

    if (isLoading) return <CircularProgress />
    return (
        <Box sx={{ display: "flow", position: "relative", height: "calc(100% - 5em)", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, height: "80%", paddingLeft: 3, paddingTop: 2, paddingRight: 2 }}>
                {tutees?.map((tutee) => {
                    const { data: collaborations } = useCollaborationService().useGetCollaborationsWithTutee(tutee.id);

                    let collaborationCount = collaborations?.length == undefined ? 0 : collaborations?.length;
                    let pendingCollaborationCount = 0;

                    collaborations?.map((collab) => {
                        if (collab.state == "WAITINGFORTUTEE" || collab.state == "PENDING") pendingCollaborationCount++;
                    })
                    console.log("name!: ", tutee.full_name);

                    return (
                        <Paper sx={{ padding: 2, maxWidth: "30%", justifyContent: "center", outline: 1 }}>
                            {/* Picture and Name Row */}
                            <Grid2 container spacing={2} alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
                                <Avatar
                                    alt="User Name"
                                    src="/path-to-image.jpg"
                                    sx={{ width: 80, height: 80 }}
                                />
                                <Typography sx={{ overflow: "auto" }} variant="h5">{tutee.full_name}</Typography>
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
            </Box >
            <Button sx={{ background: "black", position: "absolute", bottom: "1px", right: "15px" }}>View All Tutees</Button>
        </Box>
    );
}