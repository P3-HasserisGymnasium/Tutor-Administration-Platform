package project.backend.controller_bodies.meeting_controller;

import project.backend.model.EntityType;



public class MeetingCancelRequestBody {
  
    public Long senderId;
    public EntityType senderRole;

    public Long receiverId;
    public EntityType receiverRole;
}
