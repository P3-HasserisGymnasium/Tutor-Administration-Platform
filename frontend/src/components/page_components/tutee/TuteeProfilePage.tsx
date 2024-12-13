import { Alert, Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import DeleteAccountDialog from "../dialogs/DeleteAccountDialog";
import {useEffect, useState } from "react";
import { useAuth } from "~/api/authentication/useAuth";

import { useWrap, useVariableWidth, useVariableHeight } from "~/utilities/helperFunctions";
import { useRoleService } from "~/api/services/role-service";

import SubjectChip from "~/components/content_components/SubjectChip";

import CustomButton from "~/components/content_components/CustomButton";
import { FormProvider, useForm } from "react-hook-form";
import { zodTuteeProfileSchema } from "~/types/entity_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomAutocomplete from "~/components/content_components/CustomAutocomplete";
import InitialsAvatar from "~/components/content_components/InitialsAvatar";
import { toast } from "react-toastify";
import CommunicationChip from "~/components/content_components/CommunicationChip";
import SetCommunication from "~/components/content_components/SetCommunication";

type TuteeProfile = z.infer<typeof zodTuteeProfileSchema>;

export default function TuteeProfilePage() {
  const [isDeleteAcountDialogOpen, setIsDeleteAcountDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { userState } = useAuth();
  const userId = userState.id;


  const { data: tuteeProfile, isLoading: isTuteeProfileLoading, error } = useRoleService().useGetTuteeProfile(userId);
  const editProfileMutation = useRoleService().useEditTuteeProfile();
  
  
  const useFormProvider = {
    resolver: zodResolver(zodTuteeProfileSchema),
    defaultValues: {
      full_name: tuteeProfile?.full_name,
      year_group: tuteeProfile?.year_group,
      languages: tuteeProfile?.languages || [],
      contact_info: tuteeProfile?.contact_info || [],
      subjects_receiving_help_in: tuteeProfile?.subjects_receiving_help_in || [],
    },
  };

  
  const formMethods = useForm<TuteeProfile>(useFormProvider);
  const { handleSubmit, setValue} = formMethods;
  useEffect(() => {
    if (tuteeProfile) {
      // Manually set values if tuteeProfile is loaded
      setValue("languages", tuteeProfile.languages || []);
      setValue("year_group", tuteeProfile.year_group);
      setValue("full_name", tuteeProfile.full_name);
      setValue("contact_info", tuteeProfile.contact_info || []);
      setValue("subjects_receiving_help_in", tuteeProfile.subjects_receiving_help_in || []);
    }
  }, [tuteeProfile, setValue]); // Re-run when tuteeProfile data is available

  const onSave = async (data: TuteeProfile) => {
  try {

     // Log the updated profile to the console
      console.log("Updated Profile:", data);


    // Call the mutation with the required parameters
    editProfileMutation.mutate(
      { id: userId, profile: data },
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

                      {tuteeProfile?.contact_info?.length > 0 && 
                      tuteeProfile.contact_info.map((contact, index) => (
                        <CommunicationChip key={index} contactInfo={contact} deleteable={true} />
                      ))
                    }
                    <SetCommunication/>



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
                      <strong>Subjects tutoring in:</strong>{" "}
                    </Typography>


                    {tuteeProfile?.subjects_receiving_help_in?.length ? (
                    <>  
                          {tuteeProfile?.subjects_receiving_help_in.map((subject, index) => (
                            <SubjectChip key={index} Subject={subject} />
                          ))}
                        </>
                      ) : (
                        <Typography>No subjects for help listed.</Typography>
                      )}

                

                    

                  </Box>

                  {/* Communication */}
                  <Box>
                    <Typography variant="body1">
                      <strong>Communication:</strong>{" "}
                    </Typography>


                    {tuteeProfile?.contact_info.length ? (
                      tuteeProfile.contact_info.map((contact, index) => (

                        <CommunicationChip key={index}  contactInfo={contact} deleteable={false}/>

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
