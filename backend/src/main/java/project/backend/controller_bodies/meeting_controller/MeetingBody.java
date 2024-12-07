package project.backend.controller_bodies.meeting_controller;

import project.backend.model.MeetingEnum;

public class MeetingBody {

    public Long id;
    public Long collaboration_id;
    public MeetingEnum state;
    public CustomDate date;
    public String rejection_reason;
    public String meeting_description;
    

}

