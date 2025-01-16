package project.backend.controller_bodies.collaboration_bodies;

import java.sql.Timestamp;

import project.backend.model.CollaborationState;
import project.backend.model.SubjectEnum;

public class CollaborationCreateBody {

    public Timestamp start_date;
    public Timestamp end_date;

    public Long tutor_id;
    public Long tutee_id;

    public CollaborationState state;

    public SubjectEnum subject;

    public CollaborationState adminState;

    public CollaborationState tutorState;

    public CollaborationState tuteeState;

}