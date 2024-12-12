import { Box, Paper} from "@mui/material";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useState } from "react";
//import { useAuth } from "~/api/authentication/useAuth";

import {useWrap, useVariableWidth, useVariableHeight } from "~/utilities/helperFunctions";

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);

  //const {userState} = useAuth();


  return (


    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: useWrap(),
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Paper elevation={3}
      sx={{
        margin: 1,
        width: useVariableWidth(1),
        height: useVariableHeight("calc(100% - 16px)"),
      }}>
        
      </Paper>

      <DeleteAccountDialog open={isDeleteAcountDialogOpen} setOpen={setIsDeleteAcountDialogOpen} />
    </Box>

   



 
  );
}
