import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Subject } from "~/types/data_types";
import SetTimeAvailability from "~/components/content_components/TutorListComponents/SetTimeAvailability";
import TimeAvailability from "components/content_components/TimeAvailability.tsx";
import {
  zodTutorListFilterSchema,
  tutorListFilterType,
} from "../../../types/data_types";
import { useTheme,Theme } from "@mui/material/styles";
import SubjectChip from "../SubjectChip";

export default function Filter() {
  const filterMethods = useForm<tutorListFilterType>({
    resolver: zodResolver(zodTutorListFilterSchema),
    defaultValues: {
      subjects: [],
      time_availability: [],
    },
  });

  const { getValues, control } = filterMethods;

  const allValues = getValues();

  const filter = (values: tutorListFilterType) => {
    console.log(values);
  };

  const keepWatch = useWatch({
    control,
  });

  console.log(keepWatch);

  const theme = useTheme<Theme>();
  return (
    <FormProvider {...filterMethods}>
      <Stack
        spacing={1}
        sx={{
          padding: "1em",
        }}
      >
        <Typography variant="h2">Filters</Typography>

        <Controller
          name="subjects"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={Object.values(Subject.enum)}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              filterSelectedOptions
              renderTags={(value) => 
                value.map((option, index) => (
                  <SubjectChip key={index} Subject={option} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Subjects"
                  placeholder="Select subject"
                  
                />
              )}
            />
          )}
        />

        <SetTimeAvailability />

        {allValues.time_availability.length!=0 && (
          <Box
            sx={{
              border: "1px solid" + theme.customColors.headingTextColor,
              display: "flex",
              displayDirection: "row",
            }}
          >
            {allValues.time_availability.map((timeAvailability, i) => (
              <TimeAvailability key={i} timeAvailability={timeAvailability} />
            ))}
          </Box>
        )}

        <Button onClick={filterMethods.handleSubmit(filter)}>Filter</Button>
      
      </Stack>
    </FormProvider>
  );
}
