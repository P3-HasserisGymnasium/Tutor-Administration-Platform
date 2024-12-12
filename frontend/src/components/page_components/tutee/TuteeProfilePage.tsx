import { Alert, Avatar, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useState } from "react";
import { useAuth } from "~/api/authentication/useAuth";

import { useWrap, useVariableWidth, useVariableHeight } from "~/utilities/helperFunctions";
import { useRoleService } from "~/api/services/role-service";
import { usePostService } from "~/api/services/post-service";
import SubjectChip from "~/components/content_components/SubjectChip";
import { PostType } from "~/types/entity_types";
import CustomButton from "~/components/content_components/CustomButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodTuteeProfileSchema } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomAutocomplete from "~/components/content_components/CustomAutocomplete";

type TuteeProfile = z.infer<typeof zodTuteeProfileSchema>;

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const { userState } = useAuth();
  const tuteeId = userState.id;

  const { data: tuteeProfile, isLoading: isTuteeProfileLoading, error } = useRoleService().useGetTuteeProfile(tuteeId);
  const { data: posts, isLoading: isPostsLoading, error: postsError } = usePostService().useGetTuteePosts();

  const useFormProvider = {
    resolver: zodResolver(zodTuteeProfileSchema),
    defalutValues: {
      full_name: tuteeProfile?.full_name,
      year_group: tuteeProfile?.year_group,
      languages: tuteeProfile?.languages,
      contact_info: tuteeProfile?.contact_info
    },
  }
  const formMethods = useForm<TuteeProfile>(useFormProvider);
  //const { handleSubmit, setValue, register } = formMethods;




  return (
    
    <FormProvider {...formMethods}>

    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: useWrap(),
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >


      <Paper
        elevation={3}
        sx={{
          margin: 1,
          width: useVariableWidth(1),
          height: useVariableHeight("calc(100% - 16px)"),
        }}
      >
        {isTuteeProfileLoading && <CircularProgress />}
        {error && <Alert severity="error">Failed to load tutee profile!</Alert>}
        {tuteeProfile && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              padding: 3,
            }}
          >
            {/* Icon and username */}
            <Box>
              <Avatar alt="User Name" src="/path-to-image.jpg" sx={{ width: 75, height: 75, ml: -1 }} />

              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                <strong>{tuteeProfile?.full_name}</strong>
              </Typography>
            </Box>

            {/* Conditional rendering based on editMode */}

            {editMode ? ( <>

              {/* EDIT PROFILE */}
               {/* Year group */}
            <Box>
              <Typography variant="body1">
                <strong>Year Group:</strong>{" "}
              </Typography>

              <CustomAutocomplete 
              variant="yearGroup" 
              multiple={false}
              
              sx={{width: "15em"}} 
              ></CustomAutocomplete>

            </Box>

            {/* Languages */}
            <Box>
              <Typography variant="body1">
                {" "}
                <strong>Languages:</strong>{" "}
              </Typography>
              <Typography>{tuteeProfile?.languages.join(", ")}</Typography>
            </Box>

            {/* Subjects */}
            <Box>
              <Typography variant="body1">
                <strong>Subjects:</strong>{" "}
              </Typography>

              {isPostsLoading && <CircularProgress />}
              {postsError && <Alert severity="error">Failed to load posts!</Alert>}

              {posts && posts.map((post: PostType, index: number) => <SubjectChip key={index} Subject={post.subject} />)}
            </Box>

            {/* Communication */}
            <Box>
              <Typography variant="body1">
                <strong>Communication:</strong>{" "}
              </Typography>

              {tuteeProfile?.contact_info.length ? (
              tuteeProfile.contact_info.map((contact, index) => (
                <Box key={index}>
                  <Typography variant="body2">{contact.username}</Typography>
                  <Typography variant="body2">{contact.ComunicationMedium}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No contact information provided.</Typography>
            )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <Button variant="contained" sx={{ position: "absolute", top: 26, right: 20 }}>
                Edit profile
              </Button>
              <CustomButton customType="warning" variant="contained"  
              onClick={()=>setIsDeleteAcountDialogOpen(true)}
              sx={{ position: "absolute", bottom: 26, right: 20 }}>
                
                Delete Account</CustomButton>
            </Box>
              
            
            </>
            ) :(   
              //Display profile information 
              <>
            
              {/* Year group */}
              <Box>
                <Typography variant="body1">
                  <strong>Year Group:</strong>{" "}
                </Typography>
                <Typography> {tuteeProfile?.year_group}</Typography>
              </Box>

              {/* Languages */}
              <Box>
                <Typography variant="body1">
                  {" "}
                  <strong>Languages:</strong>{" "}
                </Typography>
                <Typography>{tuteeProfile?.languages.join(", ")}</Typography>
              </Box>

              {/* Subjects */}
              <Box>
                <Typography variant="body1">
                  <strong>Subjects:</strong>{" "}
                </Typography>

                {isPostsLoading && <CircularProgress />}
                {postsError && <Alert severity="error">Failed to load posts!</Alert>}

                {posts && posts.map((post: PostType, index: number) => <SubjectChip key={index} Subject={post.subject} />)}
              </Box>

              {/* Communication */}
              <Box>
                <Typography variant="body1">
                  <strong>Communication:</strong>{" "}
                </Typography>

                {tuteeProfile?.contact_info.length ? (
                tuteeProfile.contact_info.map((contact, index) => (
                  <Box key={index}>
                    <Typography variant="body2">{contact.username}</Typography>
                    <Typography variant="body2">{contact.ComunicationMedium}</Typography>
                  </Box>
                ))
              ) : (
                <Typography>No contact information provided.</Typography>
              )}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Button variant="contained" sx={{ position: "absolute", top: 26, right: 20 }}

                onClick={()=> {setEditMode(true)}}
                
                >
                  Edit profile
                </Button>
                <CustomButton customType="warning" variant="contained"  
                onClick={()=>setIsDeleteAcountDialogOpen(true)}
                sx={{ position: "absolute", bottom: 26, right: 20 }}>
                  
                  Delete Account</CustomButton>
              </Box>
            </>
          )}

          </Box>

        )}


      </Paper>
      <DeleteAccountDialog open={isDeleteAcountDialogOpen} setOpen={setIsDeleteAcountDialogOpen} />
    </Box>

 
    </FormProvider>


  );
}
