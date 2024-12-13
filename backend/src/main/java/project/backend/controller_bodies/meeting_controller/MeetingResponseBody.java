package project.backend.controller_bodies.meeting_controller;

import java.sql.Timestamp;

public class MeetingResponseBody {

    public Long id;
    public Long collaboration_id;
    public Timestamp start_date;
    public Timestamp end_date;
    public String state;
    public String rejection_reason;
    public String meeting_description;
    public Long tutee_user_id;
    public Long tutor_user_id;
    public String tutee_name;
    public String tutor_name;
  
}
