import "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Theme {
		customColors: {
			buttonColor: string;
			collaborationBackgroundColor: string;
			postBackGroundColor: string;
			headingTextColor: string;
			boxBorderColor: string;
			subjectColors: Record<SubjectType, { background: string }>;
			arrowColor: string;
			tuteeColor: string;
			tutorColor: string;
			darkTuteeColor: string;
			darkTutorColor: string;
		};
	}

	interface ThemeOptions {
		customColors?: {
			buttonColor?: string;
			collaborationBackgroundColor?: string;
			postBackGroundColor?: string;
			headingTextColor?: string;
			boxBorderColor?: string;
			subjectColors?: Record<SubjectType, { background: string }>;
			arrowColor?: string;
			tuteeColor?: string;
			tutorColor?: string;
			darkTuteeColor?: string;
			darkTutorColor?: string;
		};
	}
}
