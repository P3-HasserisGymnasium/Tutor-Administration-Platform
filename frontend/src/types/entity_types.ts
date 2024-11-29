import { z } from "zod";
import {
	Language,
	Subject,
	YearGroup,
	TimeSlot,
	MeetingState,
	CollaborationState,
	zodUUID,
	zodRole
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

	year_group: YearGroup.optional(), // Optional field, no required error

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

	tutor_subjects: z
		.array(Subject, {
			required_error: "You must select at least one subject", // Optional field validation
		})
		.optional(), // Optional field

	tutor_profile_description: z
		.string({
			required_error: "You must provide a description", // Optional field validation
		})
		.optional(), // Optional field

	tutor_timeslots: z
		.array(TimeSlot, {
			required_error: "You must select at least one timeslot", // Optional field validation
		})
		.optional(), // Optional field
});


export type PostType = z.infer<typeof zodPostSchema>;
export type ProfileType = z.infer<typeof zodProfileSchema>;
export type MeetingType = z.infer<typeof zodMeetingSchema>;
export type CollaborationType = z.infer<typeof zodCollaborationSchema>;
export type Feedback = z.infer<typeof zodFeedbackSchema>;
export type AccountRegisterType = z.infer<typeof zodAccountRegisterSchema>;