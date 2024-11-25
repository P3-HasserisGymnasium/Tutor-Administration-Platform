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

  const darkBlue = "#041758";
  return (
    <FormProvider {...filterMethods}>
      <Stack
        spacing={1}
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "30px",
            color: darkBlue,
            fontWeight: "inter",
          }}
        >
          Filters
        </Typography>

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
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Subjects"
                  placeholder="Select subject"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: darkBlue,
                      "&.Mui-focused": {
                        color: darkBlue,
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkBlue,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: darkBlue,
                      },
                    },
                  }}
                />
              )}
            />
          )}
        />

        <SetTimeAvailability />

        {allValues.time_availability && (
          <Box
            sx={{
              border: "1px solid" + darkBlue,
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
