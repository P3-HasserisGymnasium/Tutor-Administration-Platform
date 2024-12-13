package project.backend.controller_bodies.meeting_controller;

import project.backend.model.MeetingEnum;

import java.sql.Timestamp;

public class MeetingBody {

    public Long id;
    public Long collaboration;
    public Timestamp start_timestamp;
    public Timestamp end_timestamp;
    public MeetingEnum state;
    public String rejection_reason;
    public String meeting_description;
    

}

