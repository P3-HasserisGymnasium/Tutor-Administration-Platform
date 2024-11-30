import { Box, Typography } from "@mui/material";
import { TutorApplicationType, zodTutorApplicationSchema } from "~/types/data_types";
import { useForm , FormProvider, useWatch} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SetTimeAvailability from "components/content_components/SetTimeAvailability";

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
            <Box sx={{padding:"1em"}}>
                <Typography variant="h2" sx={{marginBottom:"1em"}}>Your application</Typography>
                
                <Box sx={{display: "flex", flexDirection: "row",}}>
                    <Box sx={{display: "flex", flexDirection: "column", width: "50%", height: "100%"}}>
                        <Typography variant="h3">Subjects</Typography>
                        
                        <Typography variant="h3">Time Availability</Typography>
                        <SetTimeAvailability />
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50%", height: "100%",}}>

                    </Box>
                </Box>
            </Box>
        </FormProvider>
    )
}