package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.model.LanguageEnum;
import project.backend.model.StudentCommunicatioInfo;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;

public class TuteeProfileResponse {
    public long id;
    public String full_name;
    public YearGroupEnum year_group;
    public List<LanguageEnum> languages;
    public List<SubjectEnum> subjects_receiving_help_in;
    public List<StudentCommunicatioInfo> contact_info;

    public TuteeProfileResponse(long id, String full_name, YearGroupEnum year_group, List<LanguageEnum> languages, List<SubjectEnum> subjects_receiving_help_in, List<StudentCommunicatioInfo> contact_info) {
        this.id = id;
        this.full_name = full_name;
        this.year_group = year_group;
        this.languages = languages;
        this.subjects_receiving_help_in = subjects_receiving_help_in;
        this.contact_info = contact_info;
    }

    public TuteeProfileResponse() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return full_name;
    }

    public void setFullName(String full_name) {
        this.full_name = full_name;
    }

    public YearGroupEnum getYearGroup() {
        return year_group;
    }

    public void setYearGroup(YearGroupEnum year_group) {
        this.year_group = year_group;
    }

    public List<LanguageEnum> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageEnum> languages) {
        this.languages = languages;
    }

    public List<SubjectEnum> getSubjectsReceivingHelpIn() {
        return subjects_receiving_help_in;
    }

    public void setSubjectsReceivingHelpIn(List<SubjectEnum> subjects_receiving_help_in) {
        this.subjects_receiving_help_in = subjects_receiving_help_in;
    }

    public List<StudentCommunicatioInfo> getContactInfo() {
        return contact_info;
    }

    public void setContactInfo(List<StudentCommunicatioInfo> contact_info) {
        this.contact_info = contact_info;
    }
}
