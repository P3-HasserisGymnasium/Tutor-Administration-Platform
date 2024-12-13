import { Box, Typography } from "@mui/material";
import { CollaborationType } from "~/types/entity_types";
import AdminRequestDialog from "../../dialogs/AdminRequestsDialog";
import { useState } from "react";

type CollaborationBoxProps = {
    collaboration: CollaborationType
}

export default function CollaborationBox({ collaboration }: CollaborationBoxProps) {
    const [showCollaborationDialog, setShowCollaborationDialog] = useState(false);

    return (
        <Box onClick={() => { setShowCollaborationDialog(true) }} sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <AdminRequestDialog open={showCollaborationDialog} setOpen={setShowCollaborationDialog} request={collaboration} />
            <Typography>
                paring?: {collaboration.requestedPairing == true ? "yay" : "nay"}<br></br>
                id: {collaboration.id}
            </Typography>
        </Box>
    );
}
