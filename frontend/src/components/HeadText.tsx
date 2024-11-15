import { Box, Typography } from "@mui/material";

interface HeadTextProps {
    DisplayText: string
}

export default function HeadText({ DisplayText }: HeadTextProps) {
    return (
        <Box sx={{ height: "10%", width: "100%", display: "flex", justifyContent: "left", alignItems: "center" }}>
            <Box sx={{ margin: 1, width: "calc(100% - 16px)", height: "calc(100% - 16px)", display: "flex", justifyContent: "left", alignItems: "center" }} >
                <Typography variant="h3"> {DisplayText} </Typography>
            </Box>
        </Box>
    );
}