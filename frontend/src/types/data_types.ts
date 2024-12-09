import { z } from "zod";

// Defining zod schemas for forms
export const Subject = z.enum([
	"MUSIC",
	"MATH",
	"ESS",
	"ENGLISH",
	"DANISH",
	"GERMAN",
	"FRENCH",
	"BIOLOGY",
	"CHEMISTRY",
	"PE",
	"VA",
	"PSYCHOLOGY",
	"ECON",
	"SS",
	"PHYSICS",
] as const);
export const Day = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const);
export const Language = z.enum(["Danish", "English"] as const);
export const Role = z.enum(["Tutor", "Tutee"] as const);
export const YearGroup = z.enum(["PRE_IB", "IB_1", "IB_2"] as const);
export const zodTimeSlotSchema = z.object({
	start_time: z.string(),
	end_time: z.string(),
});
export const zodTutorListFilterSchema = z.object({
	subjects: z.array(Subject),
	time_availability: z.array(
		z.object({
			day: Day,
			time: z.array(zodTimeSlotSchema),
		})
	),
	year_group: z.array(YearGroup),
	languages: z.array(Language),
});

export const zodTimeAvailabilitiesSchema = z.object({
	day: Day,
	time: z.array(zodTimeSlotSchema),
});

export const zodMeetingTime = z.object({
	day: z.string(),
	time: zodTimeSlotSchema,
});

export const zodTutorApplicationSchema = z.object({
	subjects: z.array(Subject),
	time_availability: z.array(zodTimeAvailabilitiesSchema),
	application: z.string(),
});
export const zodPostListFilterSchema = z.object({
	duration: z.array(z.number()),
	subjects: z.array(Subject),
});
export const zodPostCreationSchema = z.object({
	title: z.string(),
	description: z.string(),
	subject: Subject,
	duration: z.union([z.array(z.number()), z.undefined()]),
});

export const MeetingState = z.enum(["PENDING", "ACCEPTED", "REJECTED", "TERMINATED"] as const);
export const NotificationContext = z.enum(["TutorApplication", "Feedback", "Collaboration", "Meeting"] as const);
export const NotificationParticipant = z.enum(["Tutor", "Tutee", "Admin"] as const);

export const NotificationState = z.enum(["Unread", "Read", "Deleted"] as const);
export const CollaborationState = z.enum([
	"PENDING",
	"WAITINGFORTUTOR",
	"WAITINGFORTUTEE",
	"ACCEPTED",
	"REJECTED",
	"TERMINATED",
] as const);
export const zodUUID = z.number();

// Defining types for forms and zod schemas
export const TimeSlot = zodTimeSlotSchema;
export type tutorListFilterType = z.infer<typeof zodTutorListFilterSchema>;
export type TimeAvailabilitiesType = z.infer<typeof zodTimeAvailabilitiesSchema>;
export type zodMeetingTimeType = z.infer<typeof zodMeetingTime>;
export type PostListFilterType = z.infer<typeof zodPostListFilterSchema>;
export type TimeSlotType = z.infer<typeof zodTimeSlotSchema>;
export type LanguageType = z.infer<typeof Language>;
export type RoleType = z.infer<typeof Role>;
export type YearGroupType = z.infer<typeof YearGroup>;
export type TutorApplicationType = z.infer<typeof zodTutorApplicationSchema>;
export type PostCreationType = z.infer<typeof zodPostCreationSchema>;
export type MeetingStateType = z.infer<typeof MeetingState>;
export type NotificationContextType = z.infer<typeof NotificationContext>;
export type NotificationParticipantType = z.infer<typeof NotificationParticipant>;
export type NotificationStateType = z.infer<typeof NotificationState>;
export type DayType = z.infer<typeof Day>;
export type SubjectType = z.infer<typeof Subject>;
export type CollaborationStateType = z.infer<typeof CollaborationState>;
export type UUIDType = z.infer<typeof zodUUID>;
export type AccountRegisterResponseType = {
	tutor: boolean;
	tutee: boolean;
};
