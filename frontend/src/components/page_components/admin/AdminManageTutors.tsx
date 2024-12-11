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
        <Box sx={{ display: "flow", position: "relative", height: "calc(100% - 5em)", width: "100%" }}>
            <Box sx={{ height: "90%", width: "100%", paddingLeft: 3, paddingTop: 2 }}>
                {tutors?.map((tutor) => {
                    return <Typography>{tutor.full_name}</Typography>
                })}
            </Box >
            <Button sx={{ background: "black", position: "absolute", bottom: "5px", right: "15px" }}>View All Tutors</Button>
        </Box>
    );
}