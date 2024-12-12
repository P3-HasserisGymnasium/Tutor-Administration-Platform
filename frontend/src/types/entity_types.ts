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
	ComunicationMedium,
	zodTimeAvailabilitySchema,
	zodContactInfo,
} from "./data_types";

export const zodPostSchema = z.object({
	id: zodUUID,
	tutee_id: zodUUID.optional(),
	title: z.string(),
	description: z.string(),
	subject: Subject,
	duration: z.array(z.number()).optional(),
	state: z.string(),
});

export const zodTutorProfileSchema = z.object({
	full_name: z.string(),
	year_group: YearGroup,
	languages: z.array(Language),
	tutoring_subjects: z.array(Subject),
	contact_info: z.array(z.object({ username: z.string(), ComunicationMedium })),
	time_availability: z.array(zodTimeAvailabilitySchema),
	description: z.string().optional(),
});

export const zodTuteeProfileSchema = z.object({
	full_name: z.string(),
	year_group: YearGroup,
	languages: z.array(Language),
	subjects_receiving_help_in: z.array(Subject),
	contact_info: z.array(z.object({ username: z.string(), ComunicationMedium })),
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
	tuteeId: zodUUID,
	tutorId: zodUUID,
	tuteeName: z.string(),
	tutorName: z.string(),
	state: CollaborationState,
	subject: Subject,
	end_date: z.union([z.date(), z.string()]).optional(),
	startDate: z.union([z.date(), z.string()]).optional(),
});

export const tutorProfileSchema = z.object({
	contact_info: zodContactInfo,
	description: z.string(),
	full_name: z.string(),
	time_availability: z.array(zodTimeAvailabilitySchema),
	tutoring_subjects: z.array(Subject),
	yearGroup: YearGroup,
	languages: z.array(Language),
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

export const zodNotificationResponseSchema = z.object({
	notification_id: zodUUID.nullable(),
	sender_id: zodUUID,
	sender_name: z.string(),
	sender_type: NotificationParticipant,
	receiver_id: zodUUID,
	receiver_name: z.string(),
	receiver_type: NotificationParticipant,
	context_id: zodUUID,
	context_type: NotificationContext,
	state: NotificationState,
});

export const zodAccountRegisterSchema = z.object({
	full_name: z
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

	confirm_password: z
		.string({
			required_error: "You must confirm your password", // Required field error
		})
		.min(6, "Password confirmation must match the password"), // Minimum length validation
	// Password match check should be handled elsewhere (e.g., in `refine`)

	year_group: z
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

	tutor_profile_description: z
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

export const zodRequestCollaborationByTutorType = z.object({
	tutor_id: zodUUID,
	tutee_id: zodUUID,
	post: zodPostSchema,
});

export const zodRequestCollaborationByPostType = z.object({
	post_id: zodUUID,
	tutor_id: zodUUID,
});
export type LoginSuccessDataType = z.infer<typeof zodLoginSuccessDataType>;
export type LoginType = z.infer<typeof zodLoginSchema>;
export type UserState = z.infer<typeof zodUserStateSchema>;
export type PostType = z.infer<typeof zodPostSchema>;
export type TutorProfileType = z.infer<typeof zodTutorProfileSchema>;
export type TuteeProfileType = z.infer<typeof zodTuteeProfileSchema>;
export type MeetingType = z.infer<typeof zodMeetingSchema>;
export type CollaborationType = z.infer<typeof zodCollaborationSchema>;
export type RequestCollaborationByTutorType = z.infer<typeof zodRequestCollaborationByTutorType>;
export type RequestCollaborationByPostType = z.infer<typeof zodRequestCollaborationByPostType>;
export type Feedback = z.infer<typeof zodFeedbackSchema>;
export type AccountRegisterType = z.infer<typeof zodAccountRegisterSchema>;
export type NotificationType = z.infer<typeof zodNotificationSchema>;
export type NotificationResponseType = z.infer<typeof zodNotificationResponseSchema>;
export type TerminationType = z.infer<typeof zodTerminationSchema>;
