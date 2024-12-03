import { z } from "zod";

// Defining zod schemas for forms
export const zodSubject = z.enum([
	"Music",
	"Math",
	"Ess",
	"English",
	"Danish",
	"German",
	"French",
	"Biology",
	"Chemistry",
	"Pe",
	"Va",
	"Psychology",
	"Econ",
	"Ss",
	"Physics",
] as const);
export const zodDay = z.enum([
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const);
export const zodLanguage = z.enum(["Danish", "English"] as const);
export const zodYearGroup = z.enum(["PRE-IB", "IB-1", "IB-2"] as const);
export const zodTimeSlotSchema = z.object({
	start_time: z.string(),
	end_time: z.string(),
});
export const zodTutorListFilterSchema = z.object({
	subjects: z.array(zodSubject),
	time_availability: z.array(
		z.object({
			day: zodDay,
			time: z.array(zodTimeSlotSchema),
		})
	),
	year_group: z.array(zodYearGroup),
	languages: z.array(zodLanguage),
});
export const zodTimeAvailabilitySchema = z.object({
	day: zodDay,
	time: z.array(zodTimeSlotSchema),
});
export const zodTutorApplicationSchema = z.object({
	subjects: z.array(zodSubject),
	time_availability: z.array(
		z.object({
			day: zodDay,
			time: z.array(zodTimeSlotSchema),
		})
	),
	application: z.string(),
});
export const zodPostListFilterSchema = z.object({
	duration: z.array(z.number()),
	time_availability: z.array(
		z.object({
			day: zodDay,
			time: z.array(zodTimeSlotSchema),
		})
	),
	subjects: z.array(zodSubject),
});
export const zodMeetingState = z.enum([
	"Pending",
	"Accepted",
	"Rejected",
	"Terminated",
] as const);
export const zodNotificationContext = z.enum([
	"TutorApplication",
	"Feedback",
	"Collaboration",
	"Meeting",
] as const);
export const zodCollaborationState = z.enum([
	"Pending",
	"WaitingForTutor",
	"WaitingForTutee",
	"Accepted",
	"Rejected",
	"Terminated",
] as const);
export const zodUUID = z.string().uuid();

// Defining types for forms and zod schemas
export const Language = zodLanguage;
export const YearGroup = zodYearGroup;
export const Day = zodDay;
export const Subject = zodSubject;
export const MeetingState = zodMeetingState;
export const NotificationContext = zodNotificationContext;
export const CollaborationState = zodCollaborationState;
export const TimeSlot = zodTimeSlotSchema;
export type tutorListFilterType = z.infer<typeof zodTutorListFilterSchema>;
export type TimeAvailabilityType = z.infer<typeof zodTimeAvailabilitySchema>;
export type PostListFilterType = z.infer<typeof zodPostListFilterSchema>;
export type TimeSlotType = z.infer<typeof zodTimeSlotSchema>;
export type LanguageType = z.infer<typeof zodLanguage>;
export type YearGroupType = z.infer<typeof zodYearGroup>;
export type TutorApplicationType = z.infer<typeof zodTutorApplicationSchema>;
export type MeetingStateType = z.infer<typeof zodMeetingState>;
export type NotificationContextType = z.infer<typeof zodNotificationContext>;
export type DayType = z.infer<typeof zodDay>;
export type SubjectType = z.infer<typeof zodSubject>;
export type CollaborationStateType = z.infer<typeof zodCollaborationState>;
export type UUIDType = z.infer<typeof zodUUID>;
