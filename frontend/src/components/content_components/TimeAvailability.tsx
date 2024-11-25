import {Box, Button,Typography} from "@mui/material";
import {TimeAvailabilityType} from "~/types/enums.ts";

export default function TimeAvailability({timeAvailability}: {timeAvailability: TimeAvailabilityType}) {
    console.log("timeAvailability", timeAvailability);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(251, 193, 135, 0.5)",
            border: "1px solid #041758",
            borderRadius: "5px",
            height: "",
        }}>
            <Button>x</Button>
            <Typography variant="h6">
                {timeAvailability?.day}
            </Typography>
            <Typography variant="h6">
                {timeAvailability?.time[0].start_time} - {timeAvailability?.time[0].end_time}
            </Typography>

        </Box>
    )
}