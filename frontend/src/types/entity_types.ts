import { z } from 'zod'
import { Language, Subject, YearGroup, TimeSlot, MeetingState, CollaborationState, zodUUID } from './data_types'

export const zodPostSchema = z.object({
    id: zodUUID,
    title: z.string(),
    description: z.string(),
    subject: z.string(),
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
    full_name: z.string(),
    email: z.string(),
    password: z.string(),
    year_group: YearGroup.optional(),
    languages: z.array(Language).optional(),
    tutoring_subjects: z.array(Subject).optional(),
    tutor_profile_description: z.string().optional(),
    tutor_timeslots: z.array(TimeSlot).optional(),
});


export type PostType = z.infer<typeof zodPostSchema>;
export type ProfileType = z.infer<typeof zodProfileSchema>;
export type MeetingType = z.infer<typeof zodMeetingSchema>;
export type CollaborationType = z.infer<typeof zodCollaborationSchema>;
export type Feedback = z.infer<typeof zodFeedbackSchema>;
export type AccountRegisterType = z.infer<typeof zodAccountRegisterSchema>;