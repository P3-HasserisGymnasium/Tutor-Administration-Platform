import React from "react";
import { Autocomplete } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Subject } from "~/types/data_types";
import SubjectChip from "./SubjectChip";
import TextField from "@mui/material/TextField";
import { SubjectType } from "~/types/data_types";
import { YearGroup } from "~/types/data_types";
import { SxProps, Theme } from "@mui/system";



interface CustomAutocompleteProps {
	variant: "subject" | "yearGroup";
	multiple?: boolean;
	sx?: SxProps<Theme>;
	initialValue?: SubjectType
	options?: SubjectType[]
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
	variant,
	multiple,
	sx,
	initialValue,
	options
}) => {
	switch (variant) {
		case "subject":
			return <SubjectAutocomplete initialValue={initialValue} multiple={multiple} sx={sx} options={options} />;
		case "yearGroup":
			return <YearGroupAutocomplete multiple={multiple} sx={sx} />;
		default:
			return null;
	}
};

export default CustomAutocomplete;

function SubjectAutocomplete({
	multiple,
	sx,
	initialValue,
	options
}: {
	multiple?: boolean;
	sx?: SxProps<Theme>;
	initialValue?: SubjectType
	options?: SubjectType[]
}) {
	const { control } = useFormContext();
	return (
		<Controller
			name={multiple ? "subjects" : "subject"}
			control={control}
			render={({ field }) => (
				<Autocomplete
					multiple={multiple}
					options={options?options:Object.values(Subject.enum)}
					onChange={(_, newValue) => {
						field.onChange(newValue);
					}}
					defaultValue={initialValue}
					filterSelectedOptions
					{...(multiple && {
						renderTags: (value) =>
							Array.isArray(value) &&
							value.map((option, index) => (
								<SubjectChip
									key={index}
									Subject={option as SubjectType}
								/>
							)),
					})} // Conditionally adding renderTags only if multiple is true
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							label={multiple ? "Subjects" : "Subject"}
							placeholder="Select subject"
						/>
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
}: {
	multiple?: boolean;
	sx?: SxProps<Theme>;
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
					sx={sx}
				/>
			)}
		/>
	);
}
