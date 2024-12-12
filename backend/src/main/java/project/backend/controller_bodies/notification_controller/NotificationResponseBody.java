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

    public NotificationResponseBody(Long sender_id, String sender_name, EntityType sender_type, Long receiver_id, String receiver_name, Long context_id, EntityType context_type, NotificationState state) {
        this.sender_id = sender_id;
        this.sender_name = sender_name;
        this.sender_type = sender_type;
        this.receiver_id = receiver_id;
        this.receiver_name = receiver_name;
        this.context_id = context_id;
        this.context_type = context_type;
        this.state = state;
    }
}