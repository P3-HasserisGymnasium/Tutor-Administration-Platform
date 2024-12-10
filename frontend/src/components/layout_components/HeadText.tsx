import { Box, Typography } from "@mui/material";

interface HeadTextProps {
    DisplayText: string
}

export default function HeadText({ DisplayText }: HeadTextProps) {
    return (
        <Box sx={{ margin: 1, width: "calc(80% - 16px)", height: "calc(100% - 16px)", display: "flex", justifyContent: "left", alignItems: "center" }} >
            <Typography variant="h1"> {DisplayText} </Typography>
        </Box>
    );
}