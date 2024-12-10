import { Box, Button, Stack, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { FormProvider, useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Language, LanguageType } from "~/types/data_types";
import SetTimeAvailability from "~/components/content_components/SetTimeAvailability";
import { zodTutorListFilterSchema, tutorListFilterType } from "../../../types/data_types";
import CustomAutocomplete from "../CustomAutocomplete";

export default function Filter() {
  const filterMethods = useForm<tutorListFilterType>({
    resolver: zodResolver(zodTutorListFilterSchema),
    defaultValues: {
      subjects: [],
      time_availability: [],
      year_group: [],
      languages: [Language.Enum.English, Language.Enum.Danish],
    },
  });

  const { control } = filterMethods;

  const filter = () => {};
  return (
    <FormProvider {...filterMethods}>
      <Stack spacing={1} sx={{ padding: "1em", height: "95%" }}>
        <Typography variant="h2">Filters</Typography>
        <CustomAutocomplete variant="subject" multiple={true} />
        <CustomAutocomplete variant="yearGroup" multiple={true} />
        <SetTimeAvailability />

        <Typography variant="h4">Language</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <>
                <CustomCheckBox field={field} label={Language.Enum.Danish} />
                <CustomCheckBox field={field} label={Language.Enum.English} />
              </>
            )}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }}></Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ width: "100%" }} onClick={filterMethods.handleSubmit(filter)}>
            Filter
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
}

type CustomCheckBoxProps = {
  field: ControllerRenderProps<tutorListFilterType, "languages">;
  label: LanguageType;
};

function CustomCheckBox({ field, label }: CustomCheckBoxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={field.value.includes(label)}
          onChange={(e) => {
            const updatedLanguages = e.target.checked ? [...field.value, label] : field.value.filter((lang) => lang !== label);
            field.onChange(updatedLanguages);
          }}
        />
      }
      label={label}
      labelPlacement="start"
    />
  );
}
