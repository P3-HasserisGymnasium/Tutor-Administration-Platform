package project.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.controller_bodies.notification_controller.NotificationCreateBody;
import project.backend.model.Notification;
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
}
