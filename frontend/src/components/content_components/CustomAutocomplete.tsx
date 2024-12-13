import React from "react";
import { Autocomplete } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { LanguageType, Subject, YearGroupType } from "~/types/data_types";
import SubjectChip from "./SubjectChip";
import TextField from "@mui/material/TextField";
import { SubjectType, Language } from "~/types/data_types";
import { YearGroup } from "~/types/data_types";
import { SxProps, Theme } from "@mui/system";
import { CommunicationMedium } from "~/types/data_types";


interface CustomAutocompleteProps {
  variant: "subject" | "yearGroup" | "communication" | "languages";
  multiple?: boolean;
  sx?: SxProps<Theme>;
  initialValue?: SubjectType | YearGroupType | LanguageType[];
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({ variant, multiple, sx, initialValue }) => {
  switch (variant) {
    case "subject":
      return <SubjectAutocomplete initialValue={initialValue as SubjectType} multiple={multiple} sx={sx} />;
    case "yearGroup":
      return <YearGroupAutocomplete multiple={multiple} sx={sx} initialValue={initialValue as YearGroupType} />;
    case "communication":
      return <CommunicationAutocomplete sx={sx} />;
    case "languages":
      return <LanguagesAutocomplete sx={sx} initialValue={initialValue as LanguageType[]} />;
    default:
      return null;
  }
};

export default CustomAutocomplete;

function SubjectAutocomplete({
  multiple,
  sx,
  initialValue,
  options,
  multiple,
  sx,
  initialValue,
  options,
}: {
  multiple?: boolean;
  sx?: SxProps<Theme>;
  initialValue?: SubjectType;
  options?: SubjectType[];
  multiple?: boolean;
  sx?: SxProps<Theme>;
  initialValue?: SubjectType;
  options?: SubjectType[];
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={multiple ? "subjects" : "subject"}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple={multiple}
          options={options ? options : Object.values(Subject.enum)}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          defaultValue={initialValue}
          filterSelectedOptions
          {...(multiple && {
            renderTags: (value) =>
              Array.isArray(value) && value.map((option, index) => <SubjectChip key={index} Subject={option as SubjectType} />),
          })} // Conditionally adding renderTags only if multiple is true
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={multiple ? "Subjects" : "Subject"} placeholder="Select subject" />
          )}
          sx={sx}
        />
      )}
    />
  );
}

function YearGroupAutocomplete({
  multiple,
  sx,
  initialValue,
}: {
  multiple?: boolean;
  sx?: SxProps<Theme>;
  initialValue?: YearGroupType;
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name="year_group"
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple={multiple}
          options={Object.values(YearGroup.enum)}
          defaultValue={initialValue}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Year Group" placeholder="Select year group" />
          )}
          sx={sx}
        />
      )}
    />
  );
}

function CommunicationAutocomplete({ sx }: { sx?: SxProps<Theme> }) {
  const { control } = useFormContext();
  return (
    <Controller
      name="communication"
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={Object.values(CommunicationMedium.enum)}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Communication" placeholder="Select communication medium" />
          )}
          sx={sx}
        />
      )}
    />
  );
}

function LanguagesAutocomplete({
  multiple,
  sx,
  initialValue,
  options,
}: {
  multiple?: boolean;
  sx?: SxProps<Theme>;
  initialValue?: LanguageType[];
  options?: LanguageType[];
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name="languages"
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          options={options ? options : Object.values(Language.enum)}
          defaultValue={initialValue}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
					getOptionLabel={(option) => option} // Display option as plain text
					renderTags={() => null} // Disable chips
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={multiple ? "Languages" : "Language"}
							InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <span>
                    {Array.isArray(field.value) &&
                      field.value.join(", ")} {/* Display selected values as plain text */}
                  </span>
                ),
              }}
            />
          )}
          sx={sx}
        />
      )}
    />
  );
}
