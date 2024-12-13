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
}
