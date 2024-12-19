import { Autocomplete, Box, Button, Typography, TextField } from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/role-service";
import InitialsAvatar from "./InitialsAvatar";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import SubjectChip from "./SubjectChip";
import TimeAvailabilityBox from "./TimeAvailabilityBox";
import { ContactInfoType, SubjectType, TimeAvailabilityType } from "~/types/data_types";
import { CommunicationChip } from "./CommunicationChip";
import React, { useEffect } from "react";
import CustomButton from "./CustomButton";
import { TutorProfileType } from "~/types/entity_types";
import CustomAutocomplete from "./CustomAutocomplete";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodTutorProfileSchema } from "~/types/entity_types";
import { Language } from "~/types/data_types";
import SetCommunication from "./SetCommunication";
import SetTimeAvailability from "./SetTimeAvailability";

export default function TutorProfile() {
  const theme = useTheme<Theme>();
  const { userState } = useAuth();
  const [state, setState] = React.useState<"preview" | "edit">("preview");
  const { data: tutorProfile, isLoading, isError } = useRoleService().useGetTutorProfile(userState.id as number);
  const editPostMutation = useRoleService().useEditProfile();
  const editProfileMethods = useForm<TutorProfileType>({
    resolver: zodResolver(zodTutorProfileSchema),
    defaultValues: {
      id: userState.id as number,
    },
  });

  const { control, register, getValues, setValue, reset, handleSubmit, formState: error } = editProfileMethods;
  useWatch<TutorProfileType>({ control });
  console.log("values", editProfileMethods.getValues());
  console.log("errors", error);
  useEffect(() => {
    if (tutorProfile) {
      reset(tutorProfile);
      setValue("id", userState.id as number);
    }
  }, [tutorProfile, reset, setValue, userState.id]);

  const editProfile = (values: TutorProfileType) => {
    console.log("values", values);
    console.log("userState.id", userState.id);
    editPostMutation.mutate(
      { profile: values, id: userState.id as number },
      {
        onSuccess: () => {
          console.log("Edit profile succeeded");
          setState("preview");
        },
        onError: (error) => {
          console.error("Edit profile failed", error);
        },
      }
    );
  };

  const previewPage = (
    <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">Year Group:</Typography>
        <Typography variant="body1">{tutorProfile?.year_group.replace("_", "-")}</Typography>

        <Typography variant="h3">{tutorProfile?.languages && tutorProfile?.languages.length > 1 ? "Languages:" : "Language:"}</Typography>
        <Typography variant="body1">{tutorProfile?.languages}</Typography>

        <Typography variant="h3">Teaching in:</Typography>
        <Box>
          {tutorProfile?.tutoring_subjects?.map((subject: SubjectType, index) => {
            return <SubjectChip key={index} Subject={subject} />;
          })}
        </Box>

        <Typography variant="h3">Communication:</Typography>
        <Typography variant="body1">{tutorProfile?.contact_info ? "" : "Contacts missing"}</Typography>
        {tutorProfile?.contact_info &&
          tutorProfile?.contact_info?.map((contactInfo: ContactInfoType, index) => {
            return <CommunicationChip key={index} contactInfo={contactInfo} />;
          })}
      </Box>
      <Box sx={{ display: "flex", flecDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Description:</Typography>
          <Typography variant="body1">{tutorProfile?.description}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Time availabilities:</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {tutorProfile?.time_availability?.map((timeAvailability: TimeAvailabilityType, index: number) => {
              return <TimeAvailabilityBox key={index} timeAvailability={timeAvailability} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const editPage = (
    <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">Year Group:</Typography>
        <CustomAutocomplete variant="yearGroup" multiple={false} initialValue={getValues("year_group")} />

        <Typography variant="h3">{getValues("languages")?.length > 1 ? "Languages:" : "Language:"}</Typography>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={Object.values(Language.Enum)}
              value={field.value}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Language" sx={{ color: "black" }} />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Box {...getTagProps({ index })} sx={{ color: "black" }}>
                    {option}
                  </Box>
                ))
              }
            />
          )}
        />

        <Typography variant="h3">Communication:</Typography>
        <SetCommunication />
      </Box>
      <Box sx={{ display: "flex", flecDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Description:</Typography>

          <TextField
            multiline
            fullWidth
            rows={10}
            variant="outlined"
            placeholder="Description"
            {...register("description")}
            slotProps={{
              input: {
                style: {
                  height: "100%", // Matches the textarea's height to its container
                  overflow: "auto", // Allows internal scrolling
                  alignItems: "flex-start", // Aligns text to the top
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <SetTimeAvailability />
        </Box>
      </Box>
    </Box>
  );

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error...</Typography>;
  }

  return (
    <FormProvider {...editProfileMethods}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "2em" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <InitialsAvatar sx={{ width: "2em", height: "2em", fontSize: "2em", bgcolor: theme.palette.primary.main }} fullName="Lukas Saltenis" />
            <Typography variant="h2">{tutorProfile?.full_name}</Typography>
          </Box>
          {state === "preview" && (
            <Button
              size="large"
              sx={{ height: "3em" }}
              onClick={() => {
                setState("edit");
              }}
            >
              Edit profile
            </Button>
          )}

          {state === "edit" && (
            <CustomButton customType="success" size="large" sx={{ height: "3em" }} onClick={handleSubmit(editProfile)}>
              Save edits
            </CustomButton>
          )}
        </Box>
        {state === "preview" && previewPage}
        {state === "edit" && editPage}
      </Box>
    </FormProvider>
  );
}
/* 
function EditPage() {
  const { getValues, register } = useFormContext<TutorProfileType>();

  const { control } = useForm();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">Year Group:</Typography>
        <CustomAutocomplete variant="yearGroup" multiple={false} initialValue={getValues("year_group")} />

        <Typography variant="h3">{getValues("languages")?.length > 1 ? "Languages:" : "Language:"}</Typography>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={Object.values(Language.Enum)}
              value={field.value}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Language" />}
            />
          )}
        />

        <Typography variant="h3">Communication:</Typography>
        <SetCommunication />
      </Box>
      <Box sx={{ display: "flex", flecDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Description:</Typography>

          <TextField
            multiline
            fullWidth
            rows={10}
            variant="outlined"
            placeholder="Description"
            {...register("description")}
            slotProps={{
              input: {
                style: {
                  height: "100%", // Matches the textarea's height to its container
                  overflow: "auto", // Allows internal scrolling
                  alignItems: "flex-start", // Aligns text to the top
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <SetTimeAvailability />
        </Box>
      </Box>
    </Box>
  );
}

function PreviewPage() {
  const { getValues } = useFormContext<TutorProfileType>();
  const mockContactInfo: ContactInfoType = {
    communication_medium: "Skype",
    username: "l",
  };
}
 */
