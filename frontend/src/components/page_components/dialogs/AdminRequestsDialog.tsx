import {  /*CircularProgress,*/ Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { CollaborationType } from "~/types/entity_types";

type AdminRequestDialogProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    request: CollaborationType
};

export default function AdminRequestDialog({ open, setOpen, request }: AdminRequestDialogProps) {
    let title = "";

    if (request.requestedPairing) {
        title = "Pairing help";
    }
    else if (request.state == "WAITING_FOR_ADMIN") {
        title = "Review collaboration"
    }
    else {
        title = "Error getting title"
    }



    return (
        <Dialog
            open={open}
            onClose={() => setOpen(true)} // Hvis dette er sat, vil dialog lukke når du trykker ved siden af på siden.
            scroll="paper"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    padding: 1,
                    paddingBottom: 1,
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflowX: "hidden",
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {title}
            </DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>


            </DialogContent>

            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    gap: "2em",
                }}
            >

            </DialogActions>
        </Dialog>
    );
}
