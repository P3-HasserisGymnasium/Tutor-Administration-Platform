import { Alert, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import { useEffect, useState } from "react";
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
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { toast } from "react-toastify";

type TuteeProfile = z.infer<typeof zodTuteeProfileSchema>;

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { userState } = useAuth();
  const tuteeId = userState.id;


  const { data: tuteeProfile, isLoading: isTuteeProfileLoading, error } = useRoleService().useGetTuteeProfile(tuteeId);
  const { data: posts, isLoading: isPostsLoading, error: postsError } = usePostService().useGetTuteePosts();

  const editProfileMutation = useRoleService().editTuteeProfile;



  const useFormProvider = {
    resolver: zodResolver(zodTuteeProfileSchema),
    defaultValues: {
      full_name: tuteeProfile?.full_name,
      year_group: tuteeProfile?.year_group,
      languages: tuteeProfile?.languages,
      contact_info: tuteeProfile?.contact_info,
    },
  };
  const formMethods = useForm<TuteeProfile>(useFormProvider);

  console.log("contact info", tuteeProfile?.contact_info);

  const { handleSubmit} = formMethods;

   // UseEffect to update form values after fetching tutee profile data
   useEffect(() => {
    if (tuteeProfile) {
      formMethods.setValue("full_name", tuteeProfile.full_name);
      formMethods.setValue("year_group", tuteeProfile.year_group);
      formMethods.setValue("languages", tuteeProfile.languages);
      formMethods.setValue("contact_info", tuteeProfile.contact_info);
    }
  }, [tuteeProfile, formMethods]);

  const onSave = async (data: TuteeProfile) => {
  try {
    // Construct the profile data to be sent to the mutation
    const updatedProfile = {
      full_name: data.full_name,
      year_group: data.year_group,
      languages: data.languages,
      contact_info: data.contact_info,
    };

     // Log the updated profile to the console
      console.log("Updated Profile:", updatedProfile);

      // Log each field individually
      console.log("Full Name:", updatedProfile.full_name);
      console.log("Year Group:", updatedProfile.year_group);
      console.log("Languages:", updatedProfile.languages);
      console.log("Contact Info:", updatedProfile.contact_info);


    // Call the mutation with the required parameters
    editProfileMutation.mutate(
      { id: tuteeId, profile: updatedProfile },
      {
        onSuccess: () => {
          setEditMode(false); // Switch to view mode after successful save
        },
        onError: (error) => {
          console.error("Error saving profile:", error);
        },
      }
    );
  } catch (error) {
    console.error("Error saving profile:", error);
    toast.error("Something went wrong. Please try again.");
  }
};
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
                <InitialsAvatar fullName={tuteeProfile?.full_name} sx={{ width: 75, height: 75, ml: -1 }}/>
                <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                  <strong>{tuteeProfile?.full_name}</strong>
                </Typography>
              </Box>

              {/* Conditional rendering based on editMode */}

              {editMode ? (
                <>
                  {/* EDIT PROFILE */}
                  {/* Year group */}
                  <Box>
                    <CustomAutocomplete
                      variant="yearGroup"
                      multiple={false}
                      initialValue={tuteeProfile?.year_group}
                      sx={{ width: "15em" }}
                    ></CustomAutocomplete>
                  </Box>

                  {/* Languages */}
                  <Box>

                    <CustomAutocomplete
                      variant="languages"
                      initialValue={tuteeProfile?.languages}
                      sx={{ width: "15em"}}
                    ></CustomAutocomplete>
                  </Box>

                  

                  {/* Communication */}
                  <Box>
                    <Typography variant="body1">
                      <strong>Communication:</strong>{" "}
                    </Typography>

                    {tuteeProfile?.contact_info.length ? (
                      tuteeProfile.contact_info.map((contact, index) => (
                        <Box key={index}>
                          <Typography>{contact.CommunicationMedium}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No contact information provided.</Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                    <CustomButton customType="success" sx={{ position: "absolute", top: 26, right: 20 }}
                      variant="contained"
                      onClick={handleSubmit(onSave)}
                      
                      >Save</CustomButton>
                   
                    <CustomButton
                      customType="warning"
                      variant="contained"
                      onClick={() => setIsDeleteAcountDialogOpen(true)}
                      sx={{ position: "absolute", bottom: 26, right: 20 }}
                    >
                      Delete Account
                    </CustomButton>
                  </Box>
                </>
              ) : (
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
                          <Typography>{contact.CommunicationMedium}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No contact information provided.</Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <Button
                      variant="contained"
                      sx={{ position: "absolute", top: 26, right: 20 }}
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      Edit profile
                    </Button>
                    <CustomButton
                      customType="warning"
                      variant="contained"
                      onClick={() => setIsDeleteAcountDialogOpen(true)}
                      sx={{ position: "absolute", bottom: 26, right: 20 }}
                    >
                      Delete Account
                    </CustomButton>
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
