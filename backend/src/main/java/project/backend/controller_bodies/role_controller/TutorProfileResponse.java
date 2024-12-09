package project.backend.controller_bodies.role_controller;

import java.util.List;

import project.backend.model.Language;
import project.backend.model.StudentContactInfo;
import project.backend.model.SubjectEnum;
import project.backend.model.TutorTimeSlot;
import project.backend.model.YearGroupEnum;



public class TutorProfileResponse {
    
    public String full_name;
    public String description;
    public YearGroupEnum year_group;
    public StudentContactInfo contact_info;
    public List<SubjectEnum> tutoring_subjects;
    public List<Language> languages;
    public List<TutorTimeSlot> time_availability;
}
