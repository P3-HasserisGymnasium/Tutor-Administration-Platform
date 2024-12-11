import { CircularProgress, Typography, Box, Button } from "@mui/material";
import { TutorProfileType } from "~/types/entity_types";

type AdminOverviewProps = {
    tutors?: TutorProfileType[] | undefined;
    isLoading?: boolean;
}

export default function AdminManageTutors({ tutors, isLoading }: AdminOverviewProps) {

    console.log("tutors", tutors);
    console.log(isLoading);

    tutors?.forEach(tutor => {
        console.log("tutor name: ", tutor.full_name)
    })

    if (isLoading) return <CircularProgress />
    return (
        <Box sx={{ display: "flow", height: "100%", width: "100%" }}>
            <Box sx={{ height: "100%", width: "100%" }}>
                {tutors?.map((tutor) => {
                    return <Typography>{tutor.full_name}</Typography>
                })}
            </Box >
            <Box sx={{ height: "100%", width: "100%", alignItems: "flex-end", justifyItems: "flex-end" }}>
                <Button sx={{ background: "black" }}>View All Tutors</Button>
            </Box>
        </Box>
    );
}