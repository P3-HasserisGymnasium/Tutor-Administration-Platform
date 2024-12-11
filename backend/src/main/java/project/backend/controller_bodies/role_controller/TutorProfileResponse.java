package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.model.LanguageEnum;
import project.backend.model.StudentCommunicatioInfo;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;

public class TutorProfileResponse {
    public String full_name;
    public String description;
    public YearGroupEnum year_group;
    public List<SubjectEnum> tutoring_subjects;
    public List<StudentCommunicatioInfo> contact_info;
    public List<TimeSlotCreateBody> time_availability;
    public List<LanguageEnum> languages;
}
