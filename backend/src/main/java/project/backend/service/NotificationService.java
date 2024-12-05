package project.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.backend.model.Notification;
import project.backend.model.NotificationType;
import project.backend.model.NotificationState;
import project.backend.model.Administrator;
import project.backend.model.EntityType;

import project.backend.repository.NotificationRepository;
import project.backend.repository.AdministratorRepository;


@Service
public class NotificationService {
    
    @Autowired
    final NotificationRepository notificationRepository;

    @Autowired
    final AdministratorRepository administratorRepository;
    
    public NotificationService(NotificationRepository notificationRepository, AdministratorRepository administratorRepository ) {
        this.notificationRepository = notificationRepository;
        this.administratorRepository = administratorRepository;
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification getNotificationById(Long id) {
        Optional<Notification> notificationOpt = notificationRepository.findById(id);
        return notificationOpt.orElseThrow(() -> new IllegalArgumentException("Notification with id" + id + "not found"));
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public void changeNotificationState(Long notificationId, NotificationState notificationState){
        Notification notification = getNotificationById(notificationId);

        notification.setState(notificationState);
        saveNotification(notification); 
    }

    // Collaboration notifications
    public void notifyCollaborationRequest(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long collaborationId){
        
        createNotification(senderId, senderType, receiverId, receiverType, collaborationId, EntityType.COLLABORATION,
            "Collaboration Request", NotificationType.COLLABORATION_REQUEST, NotificationState.UNREAD);

    }

    public void notifyCollaborationRejection(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long collaborationId){

        createNotification(senderId, senderType, receiverId, receiverType, collaborationId, EntityType.COLLABORATION,
            "Collaboration Rejected", NotificationType.COLLABORATION_REJECTED, NotificationState.UNREAD );

    }

    public void notifyCollaborationAcceptance(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long collaborationId){

        createNotification(senderId, senderType, receiverId, receiverType, collaborationId, EntityType.COLLABORATION,
            "Collaboration Accepted", NotificationType.COLLABORATION_ACCEPTED, NotificationState.UNREAD );

    }

    public void notifyAdminOfCollaboration(Long senderId, EntityType senderType, Long collaborationId){

        Administrator admin = administratorRepository.findFirstBy()
            .orElseThrow(() -> new IllegalStateException("Administrator not found"));

        createNotification(senderId, senderType, admin.getId(), EntityType.ADMIN, collaborationId, EntityType.COLLABORATION,
            "Waiting for Admin", NotificationType.COLLABORATION_PENDING, NotificationState.UNREAD );

    }

    // helper method
    private void createNotification(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, 
                                Long contextId, EntityType contextType, String title, NotificationType type, NotificationState state) {

        Notification notification = new Notification();
        notification.setSenderId(senderId);
        notification.setSenderType(senderType);
        notification.setReceiverId(receiverId);
        notification.setReceiverType(receiverType);
        notification.setContextId(contextId);
        notification.setContextType(contextType);
        notification.setTitle(title);
        notification.setType(type);
        notification.setState(state);

        saveNotification(notification);
    }

    public void notifyFeedbackSubmission(Long senderId, EntityType senderType, Long feedbackId){
        Administrator admin = administratorRepository.findFirstBy()
            .orElseThrow(() -> new IllegalStateException("Administrator not found"));

        createNotification(senderId, senderType, admin.getId(), EntityType.ADMIN, feedbackId, EntityType.FEEDBACK,
            "Feedback submited", NotificationType.FEEDBACK_SUBMITTED, NotificationState.UNREAD );
    }

    // Meeting notifications
    public void notifyMeetingAccepted(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long meetingId){

        createNotification(senderId, senderType, receiverId, receiverType, meetingId, EntityType.MEETING,
            "Meeting accepted", NotificationType.MEETING_ACCEPTED, NotificationState.UNREAD );
    }

    public void notifyMeetingRejected(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long meetingId){
        createNotification(senderId, senderType, receiverId, receiverType, meetingId, EntityType.MEETING,
            "Meeting rejected", NotificationType.MEETING_REJECTED, NotificationState.UNREAD );
    }

    public void notifyMeetingRequest(Long senderId, EntityType senderType, Long receiverId, EntityType receiverType, Long meetingId){
        createNotification(senderId, senderType, receiverId, receiverType, meetingId, EntityType.MEETING,
            "Meeting request", NotificationType.MEETING_REQUEST, NotificationState.UNREAD );
    }

    
}
