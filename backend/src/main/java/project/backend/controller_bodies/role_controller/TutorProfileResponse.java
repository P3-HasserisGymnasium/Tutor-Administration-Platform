package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.controller_bodies.account_controller.TimeSlotCreateBody;
import project.backend.model.LanguageEnum;
import project.backend.model.StudentCommunicatioInfo;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;

public class TutorProfileResponse {
    public Long id;
    public String full_name;
    public String description;
    public YearGroupEnum year_group;
    public List<SubjectEnum> tutoring_subjects;
    public List<StudentCommunicatioInfo> contact_info;
    public List<TimeSlotCreateBody> time_availability;
    public List<LanguageEnum> languages;

    public TutorProfileResponse(Long id, String full_name, String description, YearGroupEnum year_group, List<SubjectEnum> tutoring_subjects, List<StudentCommunicatioInfo> contact_info, List<TimeSlotCreateBody> time_availability, List<LanguageEnum> languages) {
        this.id = id;
        this.full_name = full_name;
        this.description = description;
        this.year_group = year_group;
        this.tutoring_subjects = tutoring_subjects;
        this.contact_info = contact_info;
        this.time_availability = time_availability;
        this.languages = languages;
    }

    public TutorProfileResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public YearGroupEnum getYear_group() {
        return year_group;
    }

    public void setYear_group(YearGroupEnum year_group) {
        this.year_group = year_group;
    }

    public List<SubjectEnum> getTutoring_subjects() {
        return tutoring_subjects;
    }

    public void setTutoring_subjects(List<SubjectEnum> tutoring_subjects) {
        this.tutoring_subjects = tutoring_subjects;
    }

    public List<StudentCommunicatioInfo> getContact_info() {
        return contact_info;
    }

    public void setContact_info(List<StudentCommunicatioInfo> contact_info) {
        this.contact_info = contact_info;
    }

    public List<TimeSlotCreateBody> getTime_availability() {
        return time_availability;
    }

    public void setTime_availability(List<TimeSlotCreateBody> time_availability) {
        this.time_availability = time_availability;
    }

    public List<LanguageEnum> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageEnum> languages) {
        this.languages = languages;
    }
}
