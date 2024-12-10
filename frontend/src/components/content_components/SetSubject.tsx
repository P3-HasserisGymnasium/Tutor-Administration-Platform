import { Box, Typography, Autocomplete, TextField, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Subject, SubjectType } from "~/types/data_types";
import { useTheme, Theme } from "@mui/material/styles";
import SubjectIcon from "./SubjectIcon";
import CustomButton from "./CustomButton";

export default function SetSubject() {
	const { getValues } = useFormContext();
	const borderColor = useTheme<Theme>().customColors.boxBorderColor;
	return (
		<Box
			data-testid="setsubjectcontainer"
			sx={{ display: "flex", flexDirection: "row", width: "100%", gap: "1em", alignItems: "center" }}
		>
			<SelectSubject />
			{getValues("subjects").length > 0 && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						border: "1px solid" + borderColor,
						borderRadius: "0.5em",
						width: "fit-content",
						height: "fit-content",
						overflowX: "auto",
						whiteSpace: "nowrap",
					}}
				>
					{getValues("subjects").map((subject: SubjectType) => {
						return <SubjectCard subject={subject} />;
					})}
				</Box>
			)}
		</Box>
	);
}

function SubjectCard({ subject }: { subject: SubjectType }) {
	const { setValue, getValues } = useFormContext();
	const deleteSubject = () => {
		const currentSubjects = getValues("subjects");
		if (currentSubjects) {
			setValue(
				"subjects",
				currentSubjects.filter((value: SubjectType) => value !== subject)
			);
		}
	};

	const borderColor = useTheme<Theme>().customColors.boxBorderColor;
	const backgroundColor = useTheme<Theme>().customColors.collaborationBackgroundColor;
	return (
		<Box
			sx={{
				border: "1px solid" + borderColor,
				borderRadius: "0.5em",
				padding: "0.5em",
				backgroundColor: backgroundColor,
				margin: "0.5em",
				position: "relative",
			}}
		>
			<CustomButton data-testid="removesubjectx" customType="x" onClick={deleteSubject}>
				X
			</CustomButton>
			<SubjectIcon Subject={subject} />
		</Box>
	);
}

function SelectSubject() {
	const { setValue, getValues } = useFormContext();
	const borderColor = useTheme<Theme>().customColors.boxBorderColor;
	const [newSubject, setNewSubject] = useState<SubjectType | null>(null);

	const handleAdd = () => {
		const selectedSubjects: SubjectType[] = getValues("subjects");
		if (selectedSubjects.length !== 0 && newSubject) {
			if (!selectedSubjects.includes(newSubject)) {
				setValue("subjects", [...selectedSubjects, newSubject]);
			}
		} else {
			setValue("subjects", [newSubject]);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid" + borderColor,
				borderRadius: "0.5em",
				padding: "0.5em",
				gap: "1em",
				width: "40%",
			}}
		>
			<Typography variant="h4" align="center">
				New subject
			</Typography>
			<Autocomplete
				disablePortal
				data-testid="subjectautocomplete"
				onChange={(_, newValue) => setNewSubject(newValue)}
				options={Object.values(Subject.enum)}
				renderInput={(params) => <TextField {...params} label="Select subject" />}
			/>
			{newSubject && (
				<Button data-testid="subjectaddbutton" onClick={handleAdd}>
					Add
				</Button>
			)}
		</Box>
	);
}
