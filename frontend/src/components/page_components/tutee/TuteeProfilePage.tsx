import { Alert, Avatar, Box, CircularProgress, Paper, Typography} from "@mui/material";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useState } from "react";
import { useAuth } from "~/api/authentication/useAuth";

import {useWrap, useVariableWidth, useVariableHeight } from "~/utilities/helperFunctions";
import { useRoleService } from "~/api/services/role-service";
//import { usePostService } from "~/api/services/post-service";



export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);

  const {userState} = useAuth();

  const tuteeId = userState.id;

  const { data: tuteeProfile, isLoading: isTuteeProfileLoading, error } = useRoleService().useGetTuteeProfile(tuteeId);

  //const {data: posts, isLoading: isProfileLoading} = usePostService().useGetTuteePosts();



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


        {isTuteeProfileLoading && <CircularProgress />}
        {error && <Alert severity="error">Failed to load tutee profile!</Alert>}
        {tuteeProfile && (
          <Box>
              <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 80, height: 80 }} />
              <Typography variant="h5">{tuteeProfile?.full_name}</Typography>
            

            <Typography variant="body1"><strong>Year Group:</strong> </Typography>
            <Typography> {tuteeProfile?.year_group}</Typography>

            <Typography variant="body1"> <strong>Languages:</strong> </Typography>
            <Typography>{tuteeProfile?.languages.join(", ")}</Typography>


            <Typography variant="body1"><strong>Subjects:</strong> </Typography>


            <Typography variant="body1"><strong>Communication:</strong> </Typography>




          </Box>
        )}



         
        



        
      </Paper>

      <DeleteAccountDialog open={isDeleteAcountDialogOpen} setOpen={setIsDeleteAcountDialogOpen} />
    </Box>

   



 
  );
}
