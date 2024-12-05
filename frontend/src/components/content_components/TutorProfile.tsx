import {Box, Button }from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/roleService";
import { Role } from "~/types/data_types";
import { useEffect } from "react";

export default function TutorProfile() {
    const {userState} = useAuth();
    const profileMutation = useRoleService().getProfile;

    useEffect(() => {
        if (userState.id) {
            profileMutation.mutate({ id: userState.id, role: Role.options[0] }, {
                onSuccess: (data) => {
                    const profile = data;
                    console.log("received data", data);
                },
                onError: (e) => {
                    console.log(e); 
                }
            });
        }
    }, [userState.id, profileMutation]);

    return (
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
            <Button sx={{}}>Edit profile</Button>
            <Box sx={{display:"flex", flexDirection:"column"}}>
                
            </Box>
        </Box>
    );
}