package project.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @Column(name = "sender_id")
    Long senderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "sender_type")
    EntityType senderType;

    @Column(name = "receiver_id")
    Long receiverId;

    @Enumerated(EnumType.STRING)
    @Column(name = "receiver_type")
    EntityType receiverType;

    @Column(name = "context_id")
    Long contextId;

    @Enumerated(EnumType.STRING)
    @Column(name = "context_type")
    EntityType contextType;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    NotificationState state;

    public Notification() {}

    public Long getId() {
        return id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long id) {
        this.senderId = id;
    }

    public EntityType getSenderType() {
        return senderType;
    }

    public void setSenderType(EntityType type) {
        this.senderType = type;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long id) {
        this.receiverId = id;
    }

    public EntityType getReceiverType() {
        return receiverType;
    }

    public void setReceiverType(EntityType type) {
        this.receiverType = type;
    }

    public Long getContextId() {
        return contextId;
    }

    public void setContextId(Long id) {
        this.contextId = id;
    }

    public EntityType getContextType() {
        return contextType;
    }

    public void setContextType(EntityType type) {
        this.contextType = type;
    }
    
    public NotificationState getState() {
        return state;
    }

    public void setState(NotificationState state) {
        this.state = state;
    }
}
