package project.backend.controller_bodies.meeting_controller;

import project.backend.model.MeetingEnum;

import java.sql.Timestamp;

public class MeetingBody {

    public Long id;
    public Long collaboration_id;
    public Timestamp start_date;
    public Timestamp end_date;
    public MeetingEnum state;
    public String rejection_reason;
    public String meeting_description;
    

}

