import React from "react";
import { Autocomplete } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Subject, YearGroupType } from "~/types/data_types";
import SubjectChip from "./SubjectChip";
import TextField from "@mui/material/TextField";
import { SubjectType } from "~/types/data_types";
import { YearGroup } from "~/types/data_types";
import { SxProps, Theme } from "@mui/system";
import { CommunicationMedium } from "~/types/data_types";

interface CustomAutocompleteProps {
	variant: "subject" | "yearGroup" | "communication";
	multiple?: boolean;
	sx?: SxProps<Theme>;
	initialValue?: SubjectType | YearGroupType;
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
			return <SubjectAutocomplete initialValue={initialValue as SubjectType} multiple={multiple} sx={sx} />;
		case "yearGroup":
			return <YearGroupAutocomplete multiple={multiple} sx={sx} initialValue={initialValue as YearGroupType} />;
		case "communication":
			return <CommunicationAutocomplete sx={sx} />;
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
	initialValue
}: {
	multiple?: boolean;
	sx?: SxProps<Theme>;
	initialValue?: YearGroupType
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

function CommunicationAutocomplete({
	sx,
}: {
	sx?: SxProps<Theme>;
}) {
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
						<TextField
							{...params}
							variant="outlined"
							label="Communication"
							placeholder="Select communication medium"
						/>
					)}
					sx={sx}
				/>
			)}
		/>
	);
}
