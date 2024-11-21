// Enum for subjects
export enum Subject {
    MUSIC = "Music",
    MATH = "Math",
    ESCIENCE = "EScience",
    ENGLISH = "English",
    DANISH = "Danish",
    TYSK = "Tysk",
    FRENCH = "French",
    BIOLOGY = "Biology",
    CHEMISTRY = "Chemistry",
};

// Enum for subject colors
export const SubjectColor = {
    [Subject.MUSIC]: { backgroundColor: "#b2c9e0", color: "white" },
    [Subject.MATH]: { backgroundColor: "#ffcccb", color: "white" },
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