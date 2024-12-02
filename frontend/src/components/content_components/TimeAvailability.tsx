import { Box, Typography } from "@mui/material";
import { TimeAvailabilityType } from "~/types/data_types";
import CustomButton from "./CustomButton";
import { useTheme, Theme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";

interface TimeAvailabilityProps {
  key: number;
  timeAvailability: TimeAvailabilityType;
}

export default function TimeAvailability({timeAvailability}: TimeAvailabilityProps) {
  const theme = useTheme<Theme>();
  const {setValue,getValues} = useFormContext();
  const deleteButtonStyle = { height: '1.4em', width: '1.4em', minWidth: '1em', top: '-0.5em', right: '-0.5em', position: 'absolute'}
  
  const deleteTimeAvailability = () => {
    console.log("Deleting time availability");
    const currentTimeAvailabilities = getValues("time_availability");
    if(currentTimeAvailabilities){
      setValue("time_availability", currentTimeAvailabilities.filter((value: TimeAvailabilityType) => value !== timeAvailability))
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.customColors.collaborationBackgroundColor,
        border: "1px solid"+ theme.customColors.headingTextColor,
        borderRadius: "0.5em",
        padding: "0.2em",
        margin: "0.5em",
        position: "relative",
        textAlign: 'center',
        height: 'fit-content'
      }}
    >
      <CustomButton customType="warning" sx={deleteButtonStyle} onClick={deleteTimeAvailability}>X</CustomButton>

      <Typography variant="h4">{timeAvailability?.day}</Typography>
      {timeAvailability.time.map((timeSlot,index) => (
        <Typography variant="body1" id={String(index)} sx={{color:theme.customColors.headingTextColor}}>
        {timeSlot.start_time}-{timeSlot.end_time}
        </Typography>))
      }

    </Box>
  );
}
