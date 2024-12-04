import { z } from "zod";
import {
	Language,
	Subject,
	YearGroup,
	TimeSlot,
	MeetingState,
	CollaborationState,
	zodUUID,
	zodRole,
	zodDay,
} from "./data_types";

export const zodPostSchema = z.object({
	id: zodUUID,
	title: z.string(),
	description: z.string(),
	subject: Subject,
	duration: z.string(),
	state: z.string(),
});

export const zodProfileSchema = z.object({
	full_name: z.string(),
	year_group: YearGroup,
	languages: z.array(Language),
	subjects: z.array(Subject),
	description: z.string().optional(),
});

export const zodMeetingSchema = z.object({
	id: zodUUID,
	rejection_reason: z.string().optional(),
	end_date: z.date(),
	collaboration_id: zodUUID,
	meeting_description: z.string().optional(),
	state: MeetingState,
	start_date: z.date(),
});

export const zodCollaborationSchema = z.object({
	end_date: z.date().optional(),
	tutee_id: zodUUID,
	start_date: z.date().optional(),
	tutor_id: zodUUID,
	state: CollaborationState,
	subject: Subject,
});

export const zodFeedbackSchema = z.object({
	id: zodUUID,
	feedback: z.string(),
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
		.array(zodRole, {
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
				day: zodDay,
				time: z.array(TimeSlot),
			})
		)
		.optional(), // Optional field
});

export const zodUserStateSchema = z.object({
	id: zodUUID.nullable(),
	name: z.string().nullable(),
	role: z.array(zodRole).nullable(),
	email: z.string().email().nullable(),
	year_group: YearGroup.nullable(),
	tutoring_subjects: z.array(Subject).nullable(),
});

export type UserState = z.infer<typeof zodUserStateSchema>;
export type PostType = z.infer<typeof zodPostSchema>;
export type ProfileType = z.infer<typeof zodProfileSchema>;
export type MeetingType = z.infer<typeof zodMeetingSchema>;
export type CollaborationType = z.infer<typeof zodCollaborationSchema>;
export type Feedback = z.infer<typeof zodFeedbackSchema>;
export type AccountRegisterType = z.infer<typeof zodAccountRegisterSchema>;
