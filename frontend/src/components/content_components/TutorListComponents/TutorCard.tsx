import {Profile} from "api/services/roleService.ts";
import {Avatar, Box, Button, Typography} from "@mui/material";
import avatarDemo from "./avatarDemo.png"
import SubjectChip from "components/content_components/SubjectChip.tsx";

export default function TutorCard({profile}: {profile: Profile}) {
    const darkBlue = "#041758"

    const buttonStyle = {
        backgroundColor: "#4CAF50",
        textDecoration: "none",
        display: "inlineBlock",
        fontSize: "16px",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: "15px",
        color: "white",
    }

    return (
        <Box sx={{
            display:"flex",
            flexDirection: "row",
            backgroundColor: "rgba(251, 193, 135, 0.5)",
            border: "1px solid #041758",
            padding: "20px",
            borderRadius: "5px",
            height: "",
            }}>
            <Avatar sx={{
                borderRadius: "50%",
                marginRight: "20px",
                width: "80px",
                height: "80px",
            }}
                src={avatarDemo}
                alt={profile.full_name}
            />
            <Box sx={{
                marginRight: "20px",
            }}>
                <Typography variant="h5" sx={{color:darkBlue}}>{profile.full_name}</Typography>
                <Typography variant="h6" sx={{color:darkBlue}}>{profile.year_group}</Typography>
                {profile.subjects.map((subject) => <SubjectChip Subject={subject}/>)}
            </Box>
            <Box sx={{ display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                alignItems: "end",
                justifyContent: "center",
            }}>
                <Button variant="contained" sx={buttonStyle}>View profile</Button>
                <Button variant="contained" sx={buttonStyle}>Request collaboration</Button>
            </Box>
        </Box>
    );
}