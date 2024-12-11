package project.backend.controller_bodies.notification_controller;

import project.backend.model.EntityType;
import project.backend.model.NotificationState;

public class NotificationResponseBody {

    public Long sender_id;
    public String sender_name;
    public EntityType sender_type;
    public Long receiver_id;
    public String receiver_name;
    public EntityType receiver_type;
    public Long context_id;
    public EntityType context_type;
    public NotificationState state;
  
}
