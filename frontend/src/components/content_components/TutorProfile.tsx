import { Autocomplete, Box, Button, Typography, TextField } from "@mui/material";
import { useAuth } from "~/api/authentication/useAuth";
import { useRoleService } from "~/api/services/role-service";
import InitialsAvatar from "./InitialsAvatar";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";
import SubjectChip from "./SubjectChip";
import TimeAvailabilityBox from "./TimeAvailabilityBox";
import { ContactInfoType, TimeAvailabilityType} from "~/types/data_types";
import CommunicationChip from "./CommunicationChip";
import React from "react";
import CustomButton from "./CustomButton";
import { TutorProfileType } from "~/types/entity_types";
import CustomAutocomplete from "./CustomAutocomplete";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodTutorProfileSchema } from "~/types/entity_types";
import { Language } from "~/types/data_types";
import SetCommunication from "./SetCommunication";

export default function TutorProfile() {
  const theme = useTheme<Theme>();
  const { userState } = useAuth();
  const [state, setState] = React.useState<"preview"|"edit">("preview");
  const { data: tutorProfile, isLoading, isError } = useRoleService().useGetTutorProfile(userState.id as number);
  const editProfileMethods = useForm<TutorProfileType>({
    resolver: zodResolver(zodTutorProfileSchema),
    defaultValues: tutorProfile,
  });
 
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
            <Typography variant="h2">Lukas Saltenis</Typography>
          </Box>
          {state === "preview" && (<Button size="large" sx={{ height: "3em" }} onClick={() => setState("edit")}>
            Edit profile
          </Button>)}

          {state === "edit" && (<CustomButton customType="success" size="large" sx={{ height: "3em" }} onClick={() => setState("preview")}>
            Save
          </CustomButton>)}
        </Box>

        {state === "edit" && <EditPage tutorProfile={tutorProfile}/>}
        {state === "preview" && <PreviewPage tutorProfile={tutorProfile}/>}

      </Box>
    </FormProvider>
  );
}

function EditPage({tutorProfile}:{tutorProfile:TutorProfileType|undefined}){
  const {control} = useForm();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">Year Group:</Typography>
        <CustomAutocomplete variant="yearGroup" multiple={false} initialValue={tutorProfile?.year_group}/>
      
        <Typography variant="h3">{tutorProfile && tutorProfile?.languages.length > 1 ? "Languages:" : "Language:"}</Typography>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <Autocomplete 
              multiple 
              options={Object.values(Language.Enum)} 
              defaultValue={tutorProfile?.languages} 
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  variant="outlined"
                  label="Language"
                />}
            />
          )}
        />

        <Typography variant="h3">Communication:</Typography>
        <SetCommunication/>
      </Box>
      <Box sx={{ display: "flex", flecDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Description:</Typography>
          <Typography variant="body1">{tutorProfile?.description}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Time availabilities:</Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {tutorProfile?.time_availability.map((timeAvailability: TimeAvailabilityType) => {
              return <TimeAvailabilityBox timeAvailability={timeAvailability} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function PreviewPage({tutorProfile}:{tutorProfile:TutorProfileType|undefined}){
  const mockContactInfo:ContactInfoType = {
    medium: "Skype",
    username: "l",
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1em", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Typography variant="h3">Year Group:</Typography>
          <Typography variant="body1">{tutorProfile?.year_group.replace("_", "-")}</Typography>

          <Typography variant="h3">{tutorProfile && tutorProfile?.languages.length > 1 ? "Languages:" : "Language:"}</Typography>
          <Typography variant="body1">{tutorProfile?.languages.join(", ")}</Typography>

          <Typography variant="h3">Teaching in:</Typography>
          <Box>
            {tutorProfile?.tutoring_subjects.map((subject) => {
              return <SubjectChip Subject={subject} />;
            })}
          </Box>

          <Typography variant="h3">Communication:</Typography>
          <Typography variant="body1">{tutorProfile?.contact_info ? "" : "Contacts missing"}</Typography>
          <CommunicationChip contactInfo={mockContactInfo} />
        </Box>
        <Box sx={{ display: "flex", flecDirection: "row", justifyContent: "space-evenly", flex: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Typography variant="h3">Description:</Typography>
            <Typography variant="body1">{tutorProfile?.description}</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            <Typography variant="h3">Time availabilities:</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {tutorProfile?.time_availability.map((timeAvailability: TimeAvailabilityType) => {
                return <TimeAvailabilityBox timeAvailability={timeAvailability} />;
              })}
            </Box>
          </Box>
        </Box>
      </Box>
  );
}