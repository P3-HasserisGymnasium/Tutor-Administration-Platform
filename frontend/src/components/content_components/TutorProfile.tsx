import {Box, Button, Typography }from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/roleService";
import InitialsAvatar from "./InitialsAvatar";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import SubjectChip from "./SubjectChip";
import TimeAvailabilityBox from "./TimeAvailabilityBox";
import { TimeAvailabilityType } from "~/types/data_types";

export default function TutorProfile() {
    const theme = useTheme<Theme>();
    const {userState} = useAuth();
    console.log("userState", userState);
    const {data: tutorProfile, isLoading, isError} = useRoleService().useGetTutorProfile(userState.id as number);
    console.log("tutorProfile", tutorProfile);  
    
    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError) {
        return <Typography>Error...</Typography>;
    }


    return (
        <Box sx={{display:"flex", flexDirection:"column", padding:"2em" }}>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex", flexDirection:"column", gap:"1em"}}> 
                    <InitialsAvatar sx={{width:"2em", height:"2em", fontSize:"2em", bgcolor:theme.palette.primary.main}} fullName="Lukas Saltenis"/>
                    <Typography variant="h2">Lukas Saltenis</Typography>
                </Box>
                <Button size="large" sx={{height:"3em"}} onClick={() => console.log("hello")}>Edit profile</Button>
            </Box>
        

            <Box sx={{display:"flex", flexDirection:"row", marginTop:"1em", justifyContent: "space-between"}}>
                <Box sx={{display:"flex", flexDirection:"column", gap:"1em"}}>

                    <Typography variant="h3">Year Group:</Typography>
                    <Typography variant="body1">{tutorProfile?.year_group.replace("_", "-")}</Typography>

                    <Typography variant="h3">{(tutorProfile && tutorProfile?.languages.length > 1)?"Languages:":"Language:"}</Typography>
                    <Typography variant="body1">{tutorProfile?.languages.join(", ")}</Typography>
                    
                    <Typography variant="h3">Teaching in:</Typography>
                    <Box> 
                        {tutorProfile?.tutoring_subjects.map((subject) => {
                            return <SubjectChip Subject={subject}/>
                        })}
                    </Box>
                    
                    <Typography variant="h3">Communication:</Typography>
                    <Typography variant="body1">{tutorProfile?.contact_info?"":"Contacts missing"}</Typography>
                </Box>
                <Box sx={{display:"flex", flecDirection:"row", justifyContent: "space-evenly", flex: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", gap:"1em"}}>
                        <Typography variant="h3">Description:</Typography>
                        <Typography variant="body1">{tutorProfile?.description}</Typography>
                    </Box>
                            
                    <Box sx={{display:"flex", flexDirection:"column", gap:"1em"}}>
                        <Typography variant="h3">Time availabilities:</Typography>
                        <Box sx={{display:"flex", flexDirection:"row"}}>
                            {tutorProfile?.time_availability.map((timeAvailability: TimeAvailabilityType) => {
                                return <TimeAvailabilityBox timeAvailability={timeAvailability}/>
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
