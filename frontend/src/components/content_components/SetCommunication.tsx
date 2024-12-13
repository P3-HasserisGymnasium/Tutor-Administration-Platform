import { Autocomplete, Box, Button,} from "@mui/material";
import { CommunicationMediumType, ContactInfoType } from "~/types/data_types";
import { communication_medium } from "~/types/data_types";
import TextField from "@mui/material/TextField";
import React from "react";
import CommunicationChip from "./CommunicationChip";
import { useFormContext } from "react-hook-form";
import { TutorProfileType } from "~/types/entity_types";

export default function SetCommunication(){
    const [communicationMedium, setCommunicationMedium] = React.useState<CommunicationMediumType>();
    const [username, setUsername] = React.useState<string>("");
    const {getValues, setValue} = useFormContext<TutorProfileType>();
    console.log(communicationMedium, username);

    const addContactInfo = () => {
        const currentContactInfo = getValues("contact_info");
        setValue("contact_info", [...currentContactInfo, {communication_medium: communicationMedium as CommunicationMediumType, username: username}]);
    };

    return (
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Box sx={{display:"flex", gap:"0.5em"}}>
                <Autocomplete
                    sx={{width:"60%"}}
                    options={Object.values(communication_medium.Values)}
                    onChange={(_,newValue) => setCommunicationMedium(newValue as CommunicationMediumType)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Medium"
                        />
                    )}
                />
                <TextField label="Username" size="small" onChange={(e) => setUsername(e.target.value)} />
                <Button disabled={!communicationMedium || username==""} onClick={addContactInfo}>Add</Button>
                </Box> 

           
            <Box sx={{display:"flex", flexDirection:"column"}}>
                {getValues("contact_info")?.map((contactInfo:ContactInfoType, index:number) => {
                    return <CommunicationChip key={index} contactInfo={contactInfo} deleteable={true} />;
                })}
            </Box>  
        </Box>  
    );
}


