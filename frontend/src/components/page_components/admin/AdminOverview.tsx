import { Box, Typography } from "@mui/material";
import TuteeIcon from "src/assets/TuteeIcon.svg";
import TutorIcon from "src/assets/TutorIcon.svg";
import CollaborationIcon from "src/assets/CollaborationIcon.svg";

interface AdminOverviewProps {
    tuteeCount: number | undefined;
    tutorCount: number | undefined;
    collaborationCount: number | undefined;
}

export default function AdminOverview({ tuteeCount, tutorCount, collaborationCount }: AdminOverviewProps) {
    return (
        <Box sx={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <Box sx={{ alignItems: "center", justifyContent: "center" }}>
                <img src={TuteeIcon} style={{ width: "100%" }}></img>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    {tuteeCount} tutees
                </Typography>
            </Box>
            <Box sx={{ alignItems: "center", justifyContent: "center", paddingBottom: "100px" }}>
                <img src={CollaborationIcon} style={{ width: "100%" }}></img>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    {collaborationCount} collaborations
                </Typography>
            </Box>
            <Box sx={{ alignItems: "center", justifyContent: "center", paddingTop: "25px" }}>
                <img src={TutorIcon} style={{ width: "100%" }}></img>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    {tutorCount} tutors
                </Typography>
            </Box>
        </Box >
    );
}