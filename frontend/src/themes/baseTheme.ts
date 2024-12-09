import { createTheme } from "@mui/material/styles";
import { daDK } from "@mui/material/locale";
import { Subject } from "../types/data_types";

const colors = {
	buttonTextColor: "#FFFFFF",
	successColor: "#88B971",
	errorColor: "#FF0000",
	subjectChipTextColor: "#FFFFFF",
	tuteeColor: "#FFA551",
	tutorColor: "#082BA2",
	darkTuteeColor: "#C0752F",
	darkTutorColor: "#041758",
};

const baseTheme = createTheme(
	{
		palette: {
			primary: {
				main: "#323232",
			},
			error: {
				main: colors.errorColor,
				contrastText: colors.buttonTextColor,
			},
			success: {
				main: colors.successColor,
				contrastText: colors.buttonTextColor,
			},
		},
		customColors: {
			buttonColor: colors.buttonTextColor,
			collaborationBackgroundColor: "#000000",
			postBackGroundColor: "#000000",
			headingTextColor: "#FFFFFF",
			boxBorderColor: "#000000",
			arrowColor: "#000000",
			tuteeColor: colors.tuteeColor,
			tutorColor: colors.tutorColor,
			darkTuteeColor: colors.darkTuteeColor,
			darkTutorColor: colors.darkTutorColor,
			subjectColors: {
				[Subject.Enum.MUSIC]: { background: "#b2c9e0" },
				[Subject.Enum.MATH]: { background: "#ffcccb" },
				[Subject.Enum.ESS]: { background: "#c1e1c5" },
				[Subject.Enum.ENGLISH]: { background: "#ffd700" },
				[Subject.Enum.DANISH]: { background: "#FF4141" },
				[Subject.Enum.GERMAN]: { background: "#87EB8E" },
				[Subject.Enum.FRENCH]: { background: "#1B76FF" },
				[Subject.Enum.BIOLOGY]: { background: "#98fb98" },
				[Subject.Enum.CHEMISTRY]: { background: "#dcdcdc" },
				[Subject.Enum.PE]: { background: "#ffa07a" },
				[Subject.Enum.VA]: { background: "#ffdead" },
				[Subject.Enum.PSYCHOLOGY]: { background: "#dda0dd" },
				[Subject.Enum.ECON]: { background: "#add8e6" },
				[Subject.Enum.SS]: { background: "#f0e68c" },
				[Subject.Enum.PHYSICS]: { background: "#ff6347" },
			},
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 1280,
				lg: 1670,
				xl: 1815,
			},
		},
		typography: {
			h1: {
				fontSize: "2rem",
				fontWeight: 700,
			},
			h2: {
				fontSize: "1.5rem",
				fontWeight: 700,
			},
			h3: {
				fontSize: "1.25rem",
				fontWeight: 500,
			},
			h4: {
				fontSize: "1rem",
				fontWeight: 400,
			},
			body1: {
				fontSize: "1rem",
				fontWeight: 300,
			},
		},
		components: {
			MuiAutocomplete: {
				defaultProps: {
					size: "small",
				},
			},
			MuiButton: {
				defaultProps: {
					size: "medium",
				},
				styleOverrides: {
					root: {
						textTransform: "none",
						borderRadius: "1rem",
						color: colors.buttonTextColor,
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: {
						borderRadius: "1rem",
						color: colors.subjectChipTextColor,
					},
				},
			},
			/*
		MuiDesktopTimePicker: {
			styleOverrides: {
				root: {
				"& .MuiInputBase-root": {
					fontSize: "0.875rem", // Small font size for the input
					padding: "8px", // Adjust padding to make it compact
				},
				},
			},
		},*/
		},
	},
	daDK
);

export default baseTheme;
