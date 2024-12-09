package project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import project.backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Custom queries for notifications
    
    // Find all notifications by user id
    @Query("SELECT n FROM Notification n WHERE n.receiverId = ?1")
    List<Notification> findAllSentToUserId(Long userId);

    // Find all notifications sent by user id
    @Query("SELECT n FROM Notification n WHERE n.senderId = ?1")
    List<Notification> findAllSentByUserId(Long userId);

    @Query("SELECT n FROM Notification n WHERE n.receiverId = ?1 AND n.receiverType = 'TUTEE'")
    List<Notification> findAllSentToTutee(Long tuteeId);

    @Query("SELECT n FROM Notification n WHERE n.receiverId = ?1 AND n.receiverType = 'TUTOR'")
    List<Notification> findAllSentToTutor(Long tutorId);

}   
