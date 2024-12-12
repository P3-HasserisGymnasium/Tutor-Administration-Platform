import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { TuteeProfileType } from "~/types/entity_types";
import { TuteeProfileBox } from "./admin_components/TuteeProfileBox";

type AdminManageTuteesProps = {
    tutees?: TuteeProfileType[] | undefined;
    isLoading?: boolean;
};

export default function AdminManageTutors({ tutees, isLoading }: AdminManageTuteesProps) {
    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ pl: 3, pt: 3, height: "10%", display: "flex", alignItems: "flex-end" }}>
                <Typography variant="h1">Manage Tutees</Typography>
                <Typography mb={0.5} ml={2} variant="h4">
                    Click on a tutee to manage them
                </Typography>
            </Box>

            <Box sx={{ width: "100%", display: "flex", height: "80%", alignItems: "center", justifyContent: "space-evenly" }}>
                {tutees?.map((tutee, i) => {
                    if (i > 2) return null;
                    return <TuteeProfileBox key={tutee.id} tutee={tutee} />;
                })}
                {tutees == undefined && <Typography>No tutees</Typography>}
            </Box>
            <Box sx={{ display: "flex", height: "20%", justifyContent: "flex-end", alignItems: "center", mr: 1 }}>
                <Button sx={{ height: "50px", fontSize: 18 }} variant="contained" color="primary">
                    View all tutees
                </Button>
            </Box>
        </Box>
    );
}
