import { z } from "zod";
export const zodUUID = z.number();

// Defining zod schemas for forms
export const Subject = z.enum([
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
export const Day = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const);
export const Language = z.enum(["Danish", "English"] as const);
export const Role = z.enum(["Tutor", "Tutee"] as const);
export const YearGroup = z.enum(["PRE_IB", "IB_1", "IB_2"] as const);
export const communication_medium = z.enum(["Discord", "Microsoft_teams", "Skype", "Messenger", "Email"] as const);
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

export const zodTimeAvailabilitySchema = z.object({
  day: Day,
  time: z.array(zodTimeSlotSchema),
});

export const zodMeetingTime = z.object({
  day: z.string(),
  time: zodTimeSlotSchema,
});

export const zodContactInfo = z.object({
  username: z.string(),
  communication_medium: communication_medium,
});

export const zodTutorApplicationSchema = z.object({
  user_id: zodUUID,
  subjects: z.array(Subject),
  time_availability: z.array(zodTimeAvailabilitySchema),
  tutor_profile_description: z.string(),
});
export const zodPostListFilterSchema = z.object({
  duration: z.array(z.number()),
  subjects: z.array(Subject),
});

export const PostState = z.enum(["VISIBLE", "INVISIBLE"]);
export const MeetingState = z.enum(["PENDING", "ACCEPTED", "REJECTED", "TERMINATED"] as const);
export const NotificationContext = z.enum([
  "TutorApplication",
  "Feedback",
  "COLLABORATION",
  "MEETING",
  "POST",
  "NOTIFICATION",
  "FEEDBACK"
] as const);
export const NotificationParticipant = z.enum([
  "USER",
  "STUDENT",
  "ADMIN",
  "TUTEE",
  "TUTOR"
] as const);

export const NotificationState = z.enum(["UNREAD", "READ", "DELETED"] as const);
export const CollaborationState = z.enum([
  "REJECTED",
  "WAITING_FOR_ADMIN",
  "WAITING_FOR_TUTOR",
  "WAITING_FOR_BOTH",
  "WAITING_FOR_TUTEE",
  "TERMINATED",
  "ESTABLISHED",
] as const);
export const zodPostCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  subject: Subject,
  state: PostState.optional(),
  duration: z.union([z.array(z.number()), z.undefined()]),
});
// Defining types for forms and zod schemas
export const TimeSlot = zodTimeSlotSchema;
export type tutorListFilterType = z.infer<typeof zodTutorListFilterSchema>;
export type TimeAvailabilityType = z.infer<typeof zodTimeAvailabilitySchema>;
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
export type CommunicationMediumType = z.infer<typeof communication_medium>;
export type ContactInfoType = z.infer<typeof zodContactInfo>;
export type UUIDType = z.infer<typeof zodUUID>;
export type AccountRegisterResponseType = {
  tutor: boolean;
  tutee: boolean;
};
