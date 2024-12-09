package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.model.Language;
import project.backend.model.StudentContactInfo;
import project.backend.model.SubjectEnum;
import project.backend.model.YearGroupEnum;



public class TuteeProfileResponse {
    
    public String full_name;
    public YearGroupEnum year_group;
    public List<Language> languages;
    public List<SubjectEnum> subjects_taught_in;
    public StudentContactInfo contact_info;
}
