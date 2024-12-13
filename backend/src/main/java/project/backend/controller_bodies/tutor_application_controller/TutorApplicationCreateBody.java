package project.backend.controller_bodies.tutor_application_controller;

import java.util.List;

import project.backend.model.SubjectEnum;

public class TutorApplicationCreateBody {
    
    public Long user_id;
    public List<SubjectEnum> subjects;
    public String tutor_profile_description;
    public List<TutorTimeSlotCreateBody> time_availability;
}