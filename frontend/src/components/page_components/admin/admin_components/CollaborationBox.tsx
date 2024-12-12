import { Box, Typography } from "@mui/material";
import { CollaborationType } from "~/types/entity_types";

type CollaborationBoxProps = {
    collaboration: CollaborationType
}

export default function CollaborationBox({ collaboration }: CollaborationBoxProps) {

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography>
                paring?: {collaboration.requestedPairing == true ? "yay" : "nay"}<br></br>
                id: {collaboration.id}
            </Typography>
        </Box>
    );
}
