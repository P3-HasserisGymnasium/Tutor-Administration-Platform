import icon from "@mui/icons-material/icon";
import { Box, Typography } from "@mui/material";
import { SubjectColors, Subject } from "~/types/enums"; 

type SubjectIconProps = {
    Subject: Subject
}

// Enum for subject colors
export default function SubjectIcon({Subject}: SubjectIconProps){

    const style = SubjectColors[Subject]

    return (
      <Box sx={{ 
        color: style.color,
        width: "300px",
        
        }}>
        {style.icon}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: style.color }}>
        {style.name}
      </Typography>
      </Box>
    )

}