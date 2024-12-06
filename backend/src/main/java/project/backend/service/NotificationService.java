package project.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.notification_controller.NotificationCreateBody;
import project.backend.model.Notification;
import project.backend.model.EntityType;
import project.backend.model.NotificationState;
import project.backend.repository.NotificationRepository;


@Service
public class NotificationService {
    
    @Autowired
    final NotificationRepository notificationRepository;
    
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(NotificationCreateBody body) {

        Notification notification = new Notification();

        notification.setSenderId(body.sender_id);
        notification.setSenderType(body.sender_type);

        notification.setReceiverId(body.receiver_id);
        notification.setReceiverType(body.receiver_type);

        notification.setContextId(body.context_id);
        notification.setContextType(body.context_type);

        notification.setState(body.state);

        return notificationRepository.save(notification);
    }

    public void sendNotification(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType,
                                  Long contextId, EntityType contextType) {
        NotificationCreateBody body = new NotificationCreateBody();
        body.sender_id = senderId;
        body.sender_type = senderType;
        body.receiver_id = receiverId;
        body.receiver_type = receiverType;
        body.context_id = contextId;
        body.context_type = contextType;
        body.state = NotificationState.UNREAD;

        createNotification(body);
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> getAllNotificationsSentToUserId(Long userId) {
        return notificationRepository.findAllSentToUserId(userId);
    }

    public List<Notification> getAllNotificationsSentByUserId(Long userId) {
        return notificationRepository.findAllSentByUserId(userId);
    }

    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public void changeNotificationState(Long notificationId, NotificationState newState) {
    Notification notification = notificationRepository.findById(notificationId)
        .orElseThrow(() -> new IllegalArgumentException("Notification with ID " + notificationId + " not found"));

    notification.setState(newState);

    notificationRepository.save(notification);
}
}
