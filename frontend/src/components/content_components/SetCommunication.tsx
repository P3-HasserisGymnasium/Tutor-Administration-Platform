import { Autocomplete, Box } from "@mui/material";
import { CommunicationMediumType } from "~/types/data_types";
import { CommunicationMedium } from "~/types/data_types";
import TextField from "@mui/material/TextField";
import React from "react";

export default function SetCommunication() {
    const [communicationMedium, setCommunicationMedium] = React.useState<CommunicationMediumType>();
    return (
        <Box sx={{display:"flex", flexDirection:"column"}}>
            <Box sx={{display:"flex"}}>
                <Autocomplete
                    options={Object.values(CommunicationMedium)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={(e) => setCommunicationMedium(e.target.value as CommunicationMediumType)}
                            variant="outlined"
                            label="Communication"
                            placeholder="Select Communication"
                        />
                    )}
                />
                
            </Box>
           
        </Box>  
      
    );
}
