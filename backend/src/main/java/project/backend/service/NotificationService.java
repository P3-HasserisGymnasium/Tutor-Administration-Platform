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

    @Autowired
    final private RoleService roleService; 
    
    public NotificationService(NotificationRepository notificationRepository, RoleService roleService) {
        this.notificationRepository = notificationRepository;
        this.roleService = roleService;
    }

    public Notification createNotification(NotificationCreateBody body) {

        Notification notification = new Notification();

        notification.setSenderId(body.sender_id);
        notification.setSenderType(body.sender_type);
        notification.setSenderName(body.sender_name);


        notification.setReceiverId(body.receiver_id);
        notification.setReceiverName(body.receiver_name);
        notification.setReceiverType(body.receiver_type);

        notification.setContextId(body.context_id);
        notification.setContextType(body.context_type);

        notification.setState(body.state);

        return notificationRepository.save(notification);
    }

    public void sendNotification(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType,
                                  Long contextId, EntityType contextType) {
        NotificationCreateBody body = new NotificationCreateBody();

        
        String sender_name = generateSenderName(senderId, senderType);
        String receiver_name = generateReceiverName(receiverId, receiverType);
        System.out.println("sender_name" + sender_name);                         
        System.out.println("receiver_name" + receiver_name);
        System.out.println("senderId" + senderId);
        System.out.println("receiverId" + receiverId);
        System.out.println("contextId" + contextId);
        System.out.println("contextType" + contextType);
        System.out.println("senderType" + senderType);
        System.out.println("receiverType" + receiverType);
        body.sender_id = senderId;
        body.sender_name = sender_name;
        body.sender_type = senderType;
        body.receiver_id = receiverId;
        body.receiver_name = receiver_name;
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

    public List<Notification> getAllNotificationsSentToTuteeId(Long userId) {
        return notificationRepository.findAllSentToTutee(userId);
    }

    public List<Notification> getAllNotificationsSentToTutorId(Long userId) {
        return notificationRepository.findAllSentToTutor(userId);
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



    public String generateSenderName(Long senderId, EntityType senderType) {
        String sender_name = "";    

        if (senderType == EntityType.STUDENT) {
            sender_name = roleService.getStudentById(senderId).getFullName();
        } else if (senderType == EntityType.TUTOR) {
            sender_name = roleService.getTutorById(senderId).getStudent().getFullName();
        } else if (senderType == EntityType.ADMIN) {
            sender_name = roleService.getAdministratorById(senderId).getFullName();
        }

        return sender_name;
    }

    public String generateReceiverName(Long receiverId, EntityType receiverType) {
        String receiver_name = "";    

        if (receiverType == EntityType.STUDENT) {
            receiver_name = roleService.getStudentById(receiverId).getFullName();
        } else if (receiverType == EntityType.TUTOR) {
            receiver_name = roleService.getTutorById(receiverId).getStudent().getFullName();
        } else if (receiverType == EntityType.ADMIN) {
            receiver_name = roleService.getAdministratorById(receiverId).getFullName();
        }

        return receiver_name;
    }
}
