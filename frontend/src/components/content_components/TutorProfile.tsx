import {Box, Button, Typography }from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/roleService";
import { useEffect } from "react";
import InitialsAvatar from "./InitialsAvatar";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";

export default function TutorProfile() {
    const theme = useTheme<Theme>();
    const {userState} = useAuth();
    const profileMutation = useRoleService().getTutorProfile;

    useEffect(() => {
        if (userState.id) {
            profileMutation.mutate(userState.id, {
                onSuccess: (data) => {
                    //const profile = data;
                    console.log("received data", data);
                },
                onError: (e) => {
                    console.log(e); 
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.id]);

    return (
        <Box sx={{display:"flex", flexDirection:"column", padding:"1em" }}>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"end" }}>
                <Button size="large">Edit profile</Button>
            </Box>
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <Box sx={{display:"flex", flexDirection:"column", gap:"1em"}}>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}> 
                    <InitialsAvatar sx={{width:"2em", height:"2em",fontSize:"2em", bgcolor:theme.palette.primary.main}} fullName="Lukas Saltenis"/>
                    </Box>
                    
                    <Typography variant="h2">Lukas Saltenis</Typography>

                    <Typography variant="h3">Year Group:</Typography>

                    <Typography variant="h3">Language:</Typography>

                    <Typography variant="h3">Subjects:</Typography>

                    <Typography variant="h3">Teaching in:</Typography>


                </Box>
            </Box>
        </Box>
    );
}