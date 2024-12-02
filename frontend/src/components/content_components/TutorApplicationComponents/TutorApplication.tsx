import { Box, Button, Typography, TextField } from "@mui/material";
import { TutorApplicationType, zodTutorApplicationSchema } from "~/types/data_types";
import { useForm , FormProvider, useWatch} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SetTimeAvailability from "components/content_components/SetTimeAvailability";
import SetSubject from "../SetSubject";

export default function TutorApplication() {
    const filterMethods = useForm<TutorApplicationType>({
        resolver: zodResolver(zodTutorApplicationSchema),
        defaultValues: {
          subjects: [],
          time_availability: [],
          application: "",
        },
      });

    const {control} = filterMethods;
    const keepWatch = useWatch({
        control,
      });
    
    console.log(keepWatch);
    return (
        <FormProvider {...filterMethods}>
            <Box sx={{display:"flex", flexDirection:"column", padding:"1em", height:"95%"}}>
                <Typography variant="h2" sx={{marginBottom:"1em"}}>Your application</Typography>
                
                <Box sx={{display: "flex", flexDirection: "row", border: "1px solid" + "black", borderRadius:"0.5em"}}>
                    <Box sx={{display: "flex", flexDirection: "column", width: "50%", gap:"1em"}}>
                        <Typography variant="h3">Subjects</Typography>
                        <SetSubject/>
                
                        <Typography variant="h3">Time Availability</Typography>
                        <SetTimeAvailability />
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "50%"}}>
                        <Typography variant="h3">Write your application below:</Typography>
                        <Box sx={{display: "flex", 
                                flexGrow: 1, // Allows this box to expand to match the height of the left column
                                width: "100%",}}>
                            <TextField
                                label="Application"
                                multiline
                                rows={5}
                                fullWidth
                                variant="outlined"
                                slotProps={{
                                    input: {
                                        style: {
                                            height: "100%", // Matches the textarea's height to its container
                                            overflow: "auto", // Allows internal scrolling
                                            alignItems: "flex-start", // Aligns text to the top
                                        },
                                    },
                                }}
                                sx={{
                                    marginTop: "1em",
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "4px",
                                    flexGrow: 1, // Allows the TextField to fill the height of the parent Box
                                }}/>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}></Box>  
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems:"center", marginTop: "1em"}}>
                    <Button variant="contained">Send Application</Button>
                </Box>
            </Box>
        </FormProvider>
    )
}