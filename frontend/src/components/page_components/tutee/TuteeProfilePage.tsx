import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useState } from "react";
import { Box } from "@mui/material";

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);
  return (

    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      maxWidth: "800px",
      

    }}>
      <DeleteAccountDialog open={isDeleteAcountDialogOpen} setOpen={setIsDeleteAcountDialogOpen} />
      content
    </Box>

 
  );
}
