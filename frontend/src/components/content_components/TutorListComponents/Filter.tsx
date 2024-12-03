import {Autocomplete, Box, Button, TextField, Stack, Typography, Checkbox, FormControlLabel} from "@mui/material";
import { FormProvider, useForm, Controller, useWatch, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Language, LanguageType, Subject, YearGroup } from "~/types/data_types";
import SetTimeAvailability from "~/components/content_components/SetTimeAvailability";
import {
  zodTutorListFilterSchema,
  tutorListFilterType,
} from "../../../types/data_types";
import SubjectChip from "../SubjectChip";

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

  const filter = (values: tutorListFilterType) => {
    console.log(values);
  };

  const keepWatch = useWatch({
    control,
  });

  console.log(keepWatch);

  return (
    <FormProvider {...filterMethods}>
      <Stack
        spacing={1}
        sx={{
          padding: "1em",
          height: "95%",
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


        <Controller
          name="year_group"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={Object.values(YearGroup.enum)}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Year Group"
                  placeholder="Select year group"
                />  
              )}
            />
          )}
        />
        <SetTimeAvailability /> 

        <Typography variant="h4">Language</Typography>
        
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <>
             <CustomCheckBox field={field} label={Language.Enum.Danish}/>
             <CustomCheckBox field={field} label={Language.Enum.English}/>
            </>
          )}
        />
        </Box>
        
        <Box sx={{ flexGrow: 1 }}></Box>  
        
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{width:"100%"}} onClick={filterMethods.handleSubmit(filter)}>Filter</Button>
        </Box>
              
      </Stack>
    </FormProvider>
  );
}

type CustomCheckBoxProps = {
  field: ControllerRenderProps<tutorListFilterType,"languages">
  label: LanguageType
}

function CustomCheckBox({field,label}: CustomCheckBoxProps) {
  return (
    <FormControlLabel
      control={<Checkbox
        checked={field.value.includes(label)}
        onChange={(e) => {const updatedLanguages = e.target.checked
          ? [...field.value, label]
          : field.value.filter((lang) => lang !== label);
        field.onChange(updatedLanguages)}
      }
      />}
      label={label}
      labelPlacement="start"
    />
  );
}