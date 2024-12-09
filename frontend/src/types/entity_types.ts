import { z } from "zod";
import {
	Language,
	Subject,
	YearGroup,
	TimeSlot,
	MeetingState,
	CollaborationState,
	zodUUID,
	Role,
	Day,
	NotificationContext,
	NotificationParticipant,
	NotificationState,
	zodTimeAvailabilitiesSchema,
} from "./data_types";

export const zodPostSchema = z.object({
	id: zodUUID,
	title: z.string(),
	description: z.string(),
	subject: Subject,
	duration: z.string(),
	state: z.string(),
});

export const zodTutorProfileSchema = z.object({
	full_name: z.string(),
	year_group: YearGroup,
	languages: z.array(Language),
	subjects: z.array(Subject),
	time_availability: z.array(zodTimeAvailabilitiesSchema),
	description: z.string().optional(),
});

export const zodTuteeProfileSchema = z.object({
	full_name: z.string(),
	year_group: YearGroup,
	languages: z.array(Language),
});

export const zodMeetingSchema = z.object({
	id: zodUUID,
	collaboration_id: zodUUID,
	partner_name: z.string(),
	tutee_user_id: zodUUID,
	tutor_user_id: zodUUID,
	start_time: z.string(),
	end_time: z.string(),
	state: MeetingState,
	rejection_reason: z.string().optional(),
	meeting_description: z.string().optional(),
});

export const zodCollaborationSchema = z.object({
	id: zodUUID,
	tutee_id: zodUUID,
	tutor_id: zodUUID,
	tutee_name: z.string(),
	tutor_name: z.string(),
	state: CollaborationState,
	subject: Subject,
	end_date: z.date().optional(),
	start_date: z.date().optional(),
});

export const zodFeedbackSchema = z.object({
	id: zodUUID,
	feedback: z.string(),
});

export const zodNotificationSchema = z.object({
	id: zodUUID.nullable(),
	sender_id: zodUUID,
	sender_type: NotificationParticipant,
	receiver_id: zodUUID,
	receiver_type: NotificationParticipant,
	context_id: zodUUID,
	context_type: NotificationContext,
	state: NotificationState,
});

export const zodAccountRegisterSchema = z.object({
	fullName: z
		.string({
			required_error: "You must provide a name", // Required field error
		})
		.min(1, "You must provide a full name"), // Minimum length validation

	email: z
		.string({
			required_error: "You must provide an email", // Required field error
		})
		.email("You must provide a valid email address"), // Email format validation

	password: z
		.string({
			required_error: "You must provide a password", // Required field error
		})
		.min(6, "Password must be at least 6 characters long"), // Minimum length validation

	confirmPassword: z
		.string({
			required_error: "You must confirm your password", // Required field error
		})
		.min(6, "Password confirmation must match the password"), // Minimum length validation
	// Password match check should be handled elsewhere (e.g., in `refine`)

	yearGroup: z
		.string({
			required_error: "You must select a year group", // Optional field validation
		}) // Optional field, no required error
		.min(1, "You must select a year group"),

	languages: z
		.array(Language, {
			required_error: "You must select at least one language", // Required array error
		})
		.min(1, "You must select at least one language") // Minimum array length validation
		.optional(), // Optional field, validation applies if provided

	roles: z
		.array(Role, {
			required_error: "You must select at least one role", // Required array error
		})
		.min(1, "You must select at least one role"), // Minimum array length validation

	subjects: z
		.array(Subject, {
			required_error: "You must select at least one subject", // Optional field validation
		})
		.optional(), // Optional field

	tutorProfileDescription: z
		.string({
			required_error: "You must provide a description", // Optional field validation
		})
		.optional(), // Optional field

	time_availability: z
		.array(
			z.object({
				day: Day,
				time: z.array(TimeSlot),
			})
		)
		.optional(), // Optional field
});

export const zodUserStateSchema = z.object({
	id: zodUUID.nullable(),
	name: z.string().nullable(),
	role: z.array(Role).nullable(),
	email: z.string().email().nullable(),
	year_group: YearGroup.nullable(),
	tutoring_subjects: z.array(Subject).nullable(),
	is_administrator: z.boolean().nullable(),
});

export const zodLoginSuccessDataType = z.object({
	token: z.string(),
	id: zodUUID.nullable(),
	name: z.string().nullable(),
	role: z.array(Role).nullable(),
	email: z.string().email().nullable(),
	year_group: YearGroup.nullable(),
	tutoring_subjects: z.array(Subject).nullable(),
	is_administrator: z.boolean().nullable(),
});

export const zodLoginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const zodTerminationSchema = z.object({
	id: z.number(),
	terminationReason: z.string(),
});

export type LoginSuccessDataType = z.infer<typeof zodLoginSuccessDataType>;
export type LoginType = z.infer<typeof zodLoginSchema>;
export type UserState = z.infer<typeof zodUserStateSchema>;
export type PostType = z.infer<typeof zodPostSchema>;
export type TutorProfileType = z.infer<typeof zodTutorProfileSchema>;
export type TuteeProfileType = z.infer<typeof zodTuteeProfileSchema>;
export type MeetingType = z.infer<typeof zodMeetingSchema>;
export type CollaborationType = z.infer<typeof zodCollaborationSchema>;
export type Feedback = z.infer<typeof zodFeedbackSchema>;
export type AccountRegisterType = z.infer<typeof zodAccountRegisterSchema>;
export type NotificationType = z.infer<typeof zodNotificationSchema>;
export type TerminationType = z.infer<typeof zodTerminationSchema>