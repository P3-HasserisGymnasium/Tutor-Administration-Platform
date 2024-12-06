import {Box, Button }from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/roleService";
import { useEffect } from "react";

export default function TutorProfile() {
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
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
            <Button sx={{}}>Edit profile</Button>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                
            </Box>
        </Box>
    );
}