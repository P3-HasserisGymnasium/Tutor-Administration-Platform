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
    SS = "SOCIAL STUDIES"
}

// interface for subject styling
interface subjectStyling {
    background: string; //defining background color
    color: string; // defining text color

}

// Mapping colors to subject
export const SubjectColors: Record<Subject, subjectStyling> = {
    [Subject.MUSIC]: { background: "#b2c9e0", color: "white" },
    [Subject.MATH]: { background: "#ffcccb", color: "white" },
    [Subject.ESS]: { background: "#c1e1c5", color: "white" },
    [Subject.ENGLISH]: { background: "#ffd700", color: "white" },
    [Subject.DANISH]: { background: "#FF4141", color: "white" },
    [Subject.GERMAN]: { background: "#87EB8E", color: "white" },
    [Subject.FRENCH]: { background: "#1B76FF", color: "white" },
    [Subject.BIOLOGY]: { background: "#98fb98", color: "white" },
    [Subject.CHEMISTRY]: { background: "#dcdcdc", color: "white" },
    [Subject.PE]: { background: "#ffa07a", color: "white" },
    [Subject.VA]: { background: "#ffdead", color: "white" },
    [Subject.PSYCHOLOGY]: { background: "#dda0dd", color: "white" },
    [Subject.ECON]: { background: "#add8e6", color: "white" },
    [Subject.SS]: { background: "#f0e68c", color: "white" },
}

export type Timeslots = Date[][];

export type PostType = {
    id: number;
    title: string;
    body: string;
};

export enum YearGroup {
    "PRE-IB",
    "IB1",
    "IB2",
}

export enum Language {
    "PRE-IB",
    "IB1",
    "IB2",
}

export enum MeetingState {
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "TERMINATED"
}

export enum NotificationContext {
    "TutorApplication",
    "Feedback",
    "Collaboration",
    "Meeting"
}