import { Box, Typography} from "@mui/material";

export default function InformationBox() {
    const textStyle = {
        textAlign: "center",
    }

    return (
        <Box sx={{display:'flex', flexDirection:"column", padding:"1em", gap: "1em"}}>
            <Typography variant="h2" sx={textStyle}>Information</Typography>
            <Typography variant="h3" sx={textStyle}>An administrator will review your request once it is sent and match you with an appropriate tutor</Typography>
            <Typography variant="h3" sx={textStyle}>You will be notified once you have been pared with a tutor</Typography>
        </Box>
    );
}