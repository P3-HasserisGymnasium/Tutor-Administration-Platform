import { Box, Stack, Typography, Button} from "@mui/material";
import SetDuration from "../SetDuration";
import { FormProvider, useForm, useWatch,  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostListFilterType, zodPostListFilterSchema } from "../../../types/data_types";
import SetTimeAvailability from "../SetTimeAvailability";
import CustomAutocomplete from "../CustomAutocomplete";
import React from "react";


export default function PostFilter() {
    const filterMethods = useForm({
        resolver: zodResolver(zodPostListFilterSchema),
        defaultValues: {
            duration: [0, 36],
            time_availability: [],
            subjects: [],
        },
    })
    const {control,} = filterMethods;
    const keepWatch = useWatch({control,});
    console.log(keepWatch);
    const filter = (values: PostListFilterType) => {
        console.log(values);
    };
    
    return (
        <FormProvider {...filterMethods}>
            <Stack spacing={1.5} sx={{padding: "1em", height: "95%",}}>
                <Typography variant="h2">Filters</Typography>
                <CustomAutocomplete variant="subject"/>
                <SetDuration/>
                <SetTimeAvailability/>
                <Box sx={{ flexGrow: 1 }}/>
                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button sx={{width:"100%"}} onClick={filterMethods.handleSubmit(filter)}>Filter</Button>
                </Box>
            </Stack>
        </FormProvider>
    );
}