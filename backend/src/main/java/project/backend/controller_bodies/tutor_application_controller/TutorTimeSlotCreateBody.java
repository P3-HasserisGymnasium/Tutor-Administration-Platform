package project.backend.controller_bodies.tutor_application_controller;

import java.sql.Timestamp;



public class TutorTimeSlotCreateBody {
    
    public Long tutor_id; // optional
    public Timestamp start_time;
    public Timestamp end_time;
}