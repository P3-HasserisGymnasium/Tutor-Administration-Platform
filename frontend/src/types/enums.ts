// Enum for subjects
/*export const Subjects = {
		MUSIC: "Music",
		MATH: "Math",
		ESS: "EScience",
		ENGLISH: "English",
		DANISH: "Danish",
		TYSK: "Tysk",
		FRENCH: "French",
		BIOLOGY:"Biology",
		CHEMISTRY:"Chemistry",
		PE: "PE",
		VA: "Visual Art",
		PSYCHOLOGY:"psychology",
	  

};
*/
// Enum for Subjects
export enum Subject {
	MUSIC = "Music",
	MATH = "Math",
	ESS = "EScience",
	ENGLISH = "English",
	DANISH = "Danish",
	GERMAN = "German",
	FRENCH = "French",
	BIOLOGY = "Biology",
	CHEMISTRY = "Chemistry",
	PE = "PE",
	VA = "Visual Art",
	PSYCHOLOGY = "Psychology",
	ECON = "ECONOMY",
	SS = "SOCIAL STUDIES",
}

export enum YearGroup {
	PREIB = "Pre-IB",
	IB1 = "IB1",
	IB2 = "IB2",
}

// interface for subject styling
interface subjectStyling {
	background: string; //defining background color
	color: string; // defining text color
}

export const Day = {
	MONDAY: "Monday",
	TUESDAY: "Tuesday",
	WEDNESDAY: "Wednesday",
	THURSDAY: "Thursday",
	FRIDAY: "Friday",
	SATURDAY: "Saturday",
	SUNDAY: "Sunday",
} as const;

export type Day = (typeof Day)[keyof typeof Day];

export type TimeSlot = {
	start_time: string;
	end_time: string;
};

export type TimeAvailability = {
	day: Day;
	time: TimeSlot[];
}[];

// Mapping colors to subject
export const SubjectColors: Record<Subject, subjectStyling> = {
	[Subject.MUSIC]: { background: "#7fa6c8", color: "white" },
	[Subject.MATH]: { background: "#522222", color: "white" },
	[Subject.ESS]: { background: "#87b890", color: "white" },
	[Subject.ENGLISH]: { background: "#d1b000", color: "white" },
	[Subject.DANISH]: { background: "#c23c3c", color: "white" },
	[Subject.GERMAN]: { background: "#55b257", color: "white" },
	[Subject.FRENCH]: { background: "#1c5ebd", color: "white" },
	[Subject.BIOLOGY]: { background: "#6bb859", color: "white" },
	[Subject.CHEMISTRY]: { background: "#bfbfbf", color: "white" },
	[Subject.PE]: { background: "#d47b6c", color: "white" },
	[Subject.VA]: { background: "#d4b287", color: "white" },
	[Subject.PSYCHOLOGY]: { background: "#bc7bbc", color: "white" },
	[Subject.ECON]: { background: "#84a3c6", color: "white" },
	[Subject.SS]: { background: "#c5b053", color: "white" },
};


// interface for subject styling
interface subjectStyling {
	background: string; //defining background color
	color: string; // defining text color

}

export enum Language {
	"PRE-IB",
	"IB1",
	"IB2",
};

export enum MeetingState {
	"PENDING",
	"ACCEPTED",
	"REJECTED",
	"TERMINATED"
};

export enum NotificationContext {
	"TutorApplication",
	"Feedback",
	"Collaboration",
	"Meeting"
};

export type PostType = {
	id: number;
	title: string;
	body: string;
};
